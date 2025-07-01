import { config } from 'dotenv'
config()

import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('generate-directory-structure.sh', () => {
  it('should complete without throwing', () => {
    expect(() => {
      execSync('bash scripts/generate-directory-structure.sh', { stdio: 'inherit', env: process.env })
    }).not.toThrow()
  })
})
