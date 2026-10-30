import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

import { validateSkills } from './validate-skills.mjs';

const canonicalSkillsDir = fileURLToPath(new URL('../skills', import.meta.url));

async function makeFixture(t, skills) {
  const root = await mkdtemp(join(tmpdir(), 'validate-skills-'));
  t.after(() => rm(root, { recursive: true, force: true }));

  for (const [directory, content] of Object.entries(skills)) {
    const skillDir = join(root, directory);
    await mkdir(skillDir);
    await writeFile(join(skillDir, 'SKILL.md'), content);
  }
  return root;
}

test('validates all current skills', async () => {
  assert.ok(await validateSkills(canonicalSkillsDir) > 0);
});

test('accepts plain, quoted, and block scalar metadata', async (t) => {
  const root = await makeFixture(t, {
    plain: '---\nname: plain\ndescription: Plain description\n---\n',
    quoted: '---\nname: "quoted"\ndescription: \'Quoted description\'\n---\n',
    block: '---\nname: block\ndescription: >-\n  Block description used when\n  more detail is helpful.\n---\n',
  });

  assert.equal(await validateSkills(root), 3);
});

const invalidFixtures = [
  {
    name: 'whitespace-only description',
    content: '---\nname: broken\ndescription: "   "\n---\n',
    error: /missing or empty description/,
  },
  {
    name: 'missing description',
    content: '---\nname: broken\n---\n',
    error: /missing or empty description/,
  },
  {
    name: 'empty description',
    content: '---\nname: broken\ndescription: ""\n---\n',
    error: /missing or empty description/,
  },
  {
    name: 'empty name',
    content: '---\nname:\ndescription: Present\n---\n',
    error: /missing or empty name/,
  },
  {
    name: 'name mismatch',
    content: '---\nname: another-name\ndescription: Present\n---\n',
    error: /does not match directory/,
  },
  {
    name: 'missing frontmatter',
    content: '# No frontmatter\n',
    error: /missing opening frontmatter delimiter/,
  },
  {
    name: 'unterminated frontmatter',
    content: '---\nname: broken\ndescription: Present\n',
    error: /unterminated frontmatter/,
  },
];

for (const fixture of invalidFixtures) {
  test(`rejects ${fixture.name}`, async (t) => {
    const root = await makeFixture(t, { broken: fixture.content });
    await assert.rejects(validateSkills(root), fixture.error);
  });
}


test('CLI exits nonzero when description is removed', async (t) => {
  const root = await makeFixture(t, { broken: '---\nname: broken\n---\n' });
  const script = fileURLToPath(new URL('./validate-skills.mjs', import.meta.url));
  const result = spawnSync(process.execPath, [script, root], { encoding: 'utf8', cwd: root });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /broken: missing or empty description/);
});
