/**
 * Dynamic import utility
 *
 * This utility helps with dynamically importing components
 * to reduce the initial bundle size and improve performance
 */
import React from "react"
import dynamic from "next/dynamic"
import type { DynamicOptions } from "next/dynamic"

export const dynamicImport = <T = unknown>(path: string, options: DynamicOptions<T> = {}) => {
  return dynamic(() => import(path), {
    ssr: true,
    loading: () =>
      React.createElement("div", {
        className: "animate-pulse bg-muted h-full w-full rounded-md min-h-[100px]",
      }),
    ...options,
  })
}
