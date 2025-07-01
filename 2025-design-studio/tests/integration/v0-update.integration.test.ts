import { config } from 'dotenv'
config()

import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

// Skipped until we actually integrate the v0-update workflow
describe.skip('v0-update.sh', () => {
  it('should complete without throwing', () => {
    expect(() => {
      execSync('bash scripts/v0-update.sh', { stdio: 'inherit', env: process.env })
    }).not.toThrow()
  })
})
