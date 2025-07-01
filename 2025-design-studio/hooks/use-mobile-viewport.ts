import { useMediaQuery } from './use-media-query'

export function useMobileViewport(): boolean {
  return useMediaQuery('(max-width: 639px)') // Tailwind’s sm breakpoint
}
