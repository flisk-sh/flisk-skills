import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { findUnlistedSkills } from './check-llms-skills.mjs';

function fixture(llms) {
  const root = mkdtempSync(join(tmpdir(), 'llms-skills-'));
  for (const name of ['flisk-doctor', 'flisk-data', 'flisk-databases']) {
    mkdirSync(join(root, 'skills', name), { recursive: true });
    writeFileSync(join(root, 'skills', name, 'SKILL.md'), '# Skill\n');
  }
  writeFileSync(join(root, 'llms.txt'), llms);
  return root;
}

test('reports a skill directory that is absent from llms.txt', () => {
  const root = fixture('- [flisk-doctor](x)\n- [flisk-databases](x)\n');
  try {
    assert.deepEqual(findUnlistedSkills(join(root, 'skills'), join(root, 'llms.txt')), ['flisk-data']);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('does not treat a longer skill name as a match', () => {
  const root = fixture('- [flisk-databases](x)\n');
  try {
    assert.deepEqual(findUnlistedSkills(join(root, 'skills'), join(root, 'llms.txt')), ['flisk-data', 'flisk-doctor']);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('passes when every skill with SKILL.md is listed', () => {
  const root = fixture('- [flisk-data](x)\n- [flisk-databases](x)\n- [flisk-doctor](x)\n');
  try {
    assert.deepEqual(findUnlistedSkills(join(root, 'skills'), join(root, 'llms.txt')), []);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
