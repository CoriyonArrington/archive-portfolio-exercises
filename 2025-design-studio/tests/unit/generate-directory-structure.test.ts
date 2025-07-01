import { execSync } from 'child_process';
import { test, expect } from 'vitest';

test('generate-directory-structure smoke test', () => {
  const out = execSync('bash scripts/generate-directory-structure.sh --dry-run', { encoding: 'utf8' });
  expect(out).toContain('reports/directory-structure');
});
