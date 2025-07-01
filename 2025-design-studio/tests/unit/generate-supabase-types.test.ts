import { statSync } from 'fs';
import { resolve } from 'path';
import { test, expect } from 'vitest';

test('generate-supabase-types script exists', () => {
  const p = resolve(__dirname, '../../scripts/generate-supabase-types.sh');
  const stats = statSync(p);
  expect(stats.isFile()).toBe(true);
  expect(stats.mode & 0o111).toBeTruthy();
});
