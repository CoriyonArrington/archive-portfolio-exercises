// vite.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // allow `describe` / `it` / `expect` as globals
    globals: true,
    // run in a Node‑style environment
    environment: 'node',
    // reset mocks between tests
    clearMocks: true,
    // increase the default timeout for long‑running scripts
    testTimeout: 60_000,
    // disable process isolation (all tests in same process)
    isolate: false,
    // disable parallel file execution so Vitest can exit immediately
    fileParallelism: false,
  },
})
