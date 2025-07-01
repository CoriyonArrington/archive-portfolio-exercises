/**
 * Creates an AbortSignal that will automatically abort after the specified timeout
 * @param timeout Timeout in milliseconds
 * @returns AbortSignal
 */
export function createTimeoutSignal(timeout = 10000): AbortSignal {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort(new Error(`Request timed out after ${timeout}ms`))
  }, timeout)

  // Store the clear function on the signal object for cleanup
  const originalSignal = controller.signal

  // Clean up the timeout when the request completes
  originalSignal.addEventListener("abort", () => {
    clearTimeout(timeoutId)
  })

  return originalSignal
}

/**
 * Fetch with timeout
 * @param url URL to fetch
 * @param options Fetch options
 * @param timeoutMs Timeout in milliseconds
 * @returns Promise with fetch result
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMilliseconds = 10000,
): Promise<Response> {
  const controller = new AbortController()
  const { signal } = controller

  const timeout = setTimeout(() => {
    controller.abort()
  }, timeoutMilliseconds)

  try {
    const response = await fetch(url, {
      ...options,
      signal,
    })
    clearTimeout(timeout)
    return response
  } catch (error) {
    clearTimeout(timeout)
    throw error
  }
}

/**
 * Retry a fetch operation with exponential backoff
 * @param url URL to fetch
 * @param options Fetch options
 * @param maxRetries Maximum number of retries
 * @returns Promise with fetch result
 */
export async function fetchWithRetry(url: string, options: RequestInit = {}, maxRetries = 3): Promise<Response> {
  let retries = 0

  while (retries < maxRetries) {
    try {
      const response = await fetch(url, options)

      if (response.ok) {
        return response
      }

      // If response is not ok, but it's not a 5xx error, don't retry
      if (response.status < 500) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`)
      }

      retries++

      if (retries >= maxRetries) {
        throw new Error(`Max retries (${maxRetries}) exceeded`)
      }

      // Exponential backoff: 2^retries * 100ms
      const delay = Math.pow(2, retries) * 100
      await new Promise((resolve) => setTimeout(resolve, delay))
    } catch (error) {
      retries++

      if (retries >= maxRetries) {
        throw error
      }

      // Exponential backoff for network errors too
      const delay = Math.pow(2, retries) * 100
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  // This should never happen due to the throw in the loop
  throw new Error("Unexpected error in fetchWithRetry")
}
