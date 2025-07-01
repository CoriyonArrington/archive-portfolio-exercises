/**
 * Date utility functions
 *
 * This file contains utility functions for working with dates.
 */

/**
 * Format a date to a human-readable string
 * @param date The date to format
 * @param format The format to use (default: 'medium')
 * @returns A formatted date string
 */
export function formatDate(date: Date | string | number, format: "short" | "medium" | "long" = "medium"): string {
    const dateObj = date instanceof Date ? date : new Date(date)
  
    const options: Intl.DateTimeFormatOptions = {
      short: { month: "numeric", day: "numeric", year: "2-digit" },
      medium: { month: "short", day: "numeric", year: "numeric" },
      long: { month: "long", day: "numeric", year: "numeric", weekday: "long" },
    }[format]
  
    return new Intl.DateTimeFormat("en-US", options).format(dateObj)
  }
  
  /**
   * Get the relative time from now (e.g., "2 days ago", "in 3 hours")
   * @param date The date to get the relative time for
   * @returns A string representing the relative time
   */
  export function getRelativeTime(date: Date | string | number): string {
    const dateObj = date instanceof Date ? date : new Date(date)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)
  
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  
    if (Math.abs(diffInSeconds) < 60) {
      return rtf.format(-Math.floor(diffInSeconds), "second")
    }
  
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (Math.abs(diffInMinutes) < 60) {
      return rtf.format(-diffInMinutes, "minute")
    }
  
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (Math.abs(diffInHours) < 24) {
      return rtf.format(-diffInHours, "hour")
    }
  
    const diffInDays = Math.floor(diffInHours / 24)
    if (Math.abs(diffInDays) < 30) {
      return rtf.format(-diffInDays, "day")
    }
  
    const diffInMonths = Math.floor(diffInDays / 30)
    if (Math.abs(diffInMonths) < 12) {
      return rtf.format(-diffInMonths, "month")
    }
  
    const diffInYears = Math.floor(diffInMonths / 12)
    return rtf.format(-diffInYears, "year")
  }
  
  /**
   * Check if a date is in the past
   * @param date The date to check
   * @returns True if the date is in the past, false otherwise
   */
  export function isPastDate(date: Date | string | number): boolean {
    const dateObj = date instanceof Date ? date : new Date(date)
    return dateObj.getTime() < Date.now()
  }
  
  /**
   * Check if a date is in the future
   * @param date The date to check
   * @returns True if the date is in the future, false otherwise
   */
  export function isFutureDate(date: Date | string | number): boolean {
    const dateObj = date instanceof Date ? date : new Date(date)
    return dateObj.getTime() > Date.now()
  }
  
  /**
   * Check if a date is today
   * @param date The date to check
   * @returns True if the date is today, false otherwise
   */
  export function isToday(date: Date | string | number): boolean {
    const dateObj = date instanceof Date ? date : new Date(date)
    const today = new Date()
  
    return (
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear()
    )
  }
  
  