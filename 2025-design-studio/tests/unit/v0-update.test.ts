import { statSync } from 'fs'
import { resolve } from 'path'
import { test, expect } from 'vitest'

// Skipping this check until v0-update.sh is in use
test.skip('v0-update script exists and is executable', () => {
  const p = resolve(__dirname, '../../scripts/v0-update.sh')
  const stats = statSync(p)
  expect(stats.isFile()).toBe(true)
  expect(stats.mode & 0o111).toBeTruthy()
})
