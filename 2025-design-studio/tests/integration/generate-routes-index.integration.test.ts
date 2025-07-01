import { config } from 'dotenv'
config()

import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('generate-routes-index.sh', () => {
  it('should complete without throwing', () => {
    expect(() => {
      execSync('bash scripts/generate-routes-index.sh', { stdio: 'inherit', env: process.env })
    }).not.toThrow()
  })
})
