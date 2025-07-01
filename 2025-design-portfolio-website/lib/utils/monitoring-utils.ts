type LogLevel = "debug" | "info" | "warn" | "error"

interface LogOptions {
  level?: LogLevel
  context?: Record<string, any>
}

export function log(message: string, options: LogOptions = {}) {
  const { level = "info", context = {} } = options

  // Create a timestamp
  const timestamp = new Date().toISOString()

  // Format the log message
  const logData = {
    timestamp,
    level,
    message,
    ...context,
    environment: process.env.NODE_ENV || "development",
  }

  // In development, pretty print the logs
  if (process.env.NODE_ENV === "development") {
    const colorMap: Record<LogLevel, string> = {
      debug: "\x1b[34m", // blue
      info: "\x1b[32m", // green
      warn: "\x1b[33m", // yellow
      error: "\x1b[31m", // red
    }

    const color = colorMap[level] || "\x1b[0m"
    console.log(`${color}[${timestamp}] [${level.toUpperCase()}]:\x1b[0m ${message}`)

    if (Object.keys(context).length > 0) {
      console.log("\x1b[90mContext:\x1b[0m", context)
    }
  } else {
    // In production, output structured JSON logs
    console.log(JSON.stringify(logData))

    // If this is an error, you could send it to an error monitoring service
    if (level === "error") {
      // Example: send to an error monitoring service
      // This is where you would integrate with services like Sentry, LogRocket, etc.
      // For now, we'll just log it
    }
  }
}

export function logDebug(message: string, context?: Record<string, any>) {
  log(message, { level: "debug", context })
}

export function logInfo(message: string, context?: Record<string, any>) {
  log(message, { level: "info", context })
}

export function logWarn(message: string, context?: Record<string, any>) {
  log(message, { level: "warn", context })
}

export function logError(message: string, error?: any, context?: Record<string, any>) {
  const errorContext = error
    ? {
        ...context,
        error: {
          message: error.message,
          stack: error.stack,
          ...error,
        },
      }
    : context

  log(message, { level: "error", context: errorContext })
}

