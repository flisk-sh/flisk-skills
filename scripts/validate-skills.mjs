import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const defaultSkillsDir = fileURLToPath(new URL('../skills', import.meta.url));
const blockScalarPattern = /^[|>](?:[+-]?[1-9]?|[1-9][+-]?)$/;

function scalarValue(rawValue, lines, index) {
  const raw = rawValue.trim();

  if (blockScalarPattern.test(raw)) {
    const body = [];
    while (index + 1 < lines.length) {
      const next = lines[index + 1];
      if (next !== '' && !/^\s/.test(next)) break;
      body.push(next);
      index += 1;
    }
    return { value: body.map((line) => line.trim()).join(' ').trim(), index };
  }

  if (/^[|>]/.test(raw)) {
    throw new Error(`unsupported block scalar indicator: ${raw}`);
  }

  const singleQuoted = raw.match(/^'((?:[^']|'')*)'(?:\s+#.*)?$/);
  if (singleQuoted) {
    return { value: singleQuoted[1].replaceAll("''", "'"), index };
  }

  const doubleQuoted = raw.match(/^"((?:[^"\\]|\\.)*)"(?:\s+#.*)?$/);
  if (doubleQuoted) {
    return {
      value: doubleQuoted[1].replace(/\\(["\\])/g, '$1'),
      index,
    };
  }

  if (/^['"]/.test(raw)) throw new Error('unterminated quoted scalar');

  const value = raw.replace(/\s+#.*$/, '').trim();
  return { value: /^(?:null|~)$/i.test(value) ? '' : value, index };
}

function readFrontmatter(content) {
  const lines = content.replace(/^\uFEFF/, '').split(/\r?\n/);
  if (lines[0] !== '---') throw new Error('missing opening frontmatter delimiter');

  const end = lines.findIndex((line, index) => index > 0 && line === '---');
  if (end === -1) throw new Error('unterminated frontmatter');

  const frontmatter = lines.slice(1, end);
  const metadata = new Map();

  for (let index = 0; index < frontmatter.length; index += 1) {
    const line = frontmatter[index];
    if (line === '' || /^\s|^#/.test(line)) continue;

    const match = line.match(/^([A-Za-z_][\w-]*):(?:\s*(.*))?$/);
    if (!match || !['name', 'description'].includes(match[1])) continue;
    if (metadata.has(match[1])) throw new Error(`duplicate ${match[1]} field`);

    const parsed = scalarValue(match[2] ?? '', frontmatter, index);
    metadata.set(match[1], parsed.value);
    index = parsed.index;
  }

  return metadata;
}

export async function validateSkills(skillsDir = defaultSkillsDir) {
  const entries = (await readdir(skillsDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name));
  if (entries.length === 0) throw new Error(`no skill directories found in ${skillsDir}`);

  const errors = [];
  for (const entry of entries) {
    const skillFile = join(skillsDir, entry.name, 'SKILL.md');
    let metadata;
    try {
      metadata = readFrontmatter(await readFile(skillFile, 'utf8'));
    } catch (error) {
      errors.push(`${entry.name}: ${error.code === 'ENOENT' ? 'missing SKILL.md' : error.message}`);
      continue;
    }

    const name = metadata.get('name')?.trim();
    const description = metadata.get('description')?.trim();
    if (!name) errors.push(`${entry.name}: missing or empty name`);
    if (!description) errors.push(`${entry.name}: missing or empty description`);
    if (name && name !== entry.name) {
      errors.push(`${entry.name}: name "${name}" does not match directory`);
    }
  }

  if (errors.length > 0) throw new Error(errors.join('\n'));
  return entries.length;
}

const isMain = process.argv[1]
  && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (isMain) {
  try {
    const count = await validateSkills(process.argv[2] ? resolve(process.argv[2]) : defaultSkillsDir);
    console.log(`Validated ${count} skill${count === 1 ? '' : 's'}.`);
  } catch (error) {
    console.error(`Skill validation failed:\n${error.message}`);
    process.exitCode = 1;
  }
}
