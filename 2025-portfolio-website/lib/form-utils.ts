import type React from "react"
export function handleFormSubmit<T>(
  onSubmit: (data: T) => Promise<void> | void,
  onSuccess?: () => void,
  onError?: (error: unknown) => void,
) {
  return async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries()) as unknown as T

    try {
      await onSubmit(data)
      form.reset()
      onSuccess?.()
    } catch (error) {
      onError?.(error)
    }
  }
}
