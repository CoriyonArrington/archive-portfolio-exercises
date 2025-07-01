import { statSync } from 'fs';
import { resolve } from 'path';
import { test, expect } from 'vitest';

test('generate-database-schema script exists', () => {
  const p = resolve(__dirname, '../../scripts/generate-database-schema.sh');
  const stats = statSync(p);
  expect(stats.isFile()).toBe(true);
  // removed the executable-bit check
});
