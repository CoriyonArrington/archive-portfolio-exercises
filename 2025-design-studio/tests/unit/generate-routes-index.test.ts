import { execSync } from 'child_process';
import { test, expect } from 'vitest';

test('generate-routes-index smoke test', () => {
  const out = execSync('bash scripts/generate-routes-index.sh', { encoding: 'utf8' });
  expect(out).toContain('✅ ROUTES files saved');
});
