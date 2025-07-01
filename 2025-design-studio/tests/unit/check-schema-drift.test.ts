import { statSync } from 'fs';
import { resolve } from 'path';
import { test, expect } from 'vitest';

test('check-schema-drift script exists', () => {
  const p = resolve(__dirname, '../../scripts/check-schema-drift.sh');
  const stats = statSync(p);
  expect(stats.isFile()).toBe(true);
  expect(stats.mode & 0o111).toBeTruthy();
});
