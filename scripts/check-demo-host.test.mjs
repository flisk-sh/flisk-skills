import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

import { findOldDemoHosts } from './check-demo-host.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const oldHost = 'demo.flisk.' + 'sh';

test('the current repo has no stale demo host references', () => {
  assert.deepEqual(findOldDemoHosts(root), []);
});

test('a stale host in a skill file is found', () => {
  const dir = mkdtempSync(join(tmpdir(), 'demo-host-'));
  try {
    writeFileSync(join(dir, 'SKILL.md'), `compatibility: needs https://${oldHost}`);
    assert.deepEqual(findOldDemoHosts(dir), [join(dir, 'SKILL.md')]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
