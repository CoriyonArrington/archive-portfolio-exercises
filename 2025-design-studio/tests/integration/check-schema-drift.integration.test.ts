import { config } from 'dotenv'
config()

import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('check-schema-drift.sh', () => {
  it('should complete without throwing after syncing types', () => {
    // First, regenerate Supabase types to ensure they're current
    execSync('bash scripts/generate-supabase-types.sh', { stdio: 'inherit', env: process.env })
    // Then run the drift check
    expect(() => {
      execSync('bash scripts/check-schema-drift.sh', { stdio: 'inherit', env: process.env })
    }).not.toThrow()
  }, 60_000)
})
