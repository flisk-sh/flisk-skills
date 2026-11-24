import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

function listedIn(text, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?<![A-Za-z0-9-])${escaped}(?![A-Za-z0-9-])`).test(text);
}

export function findUnlistedSkills(skillsDir, llmsPath) {
  const llms = readFileSync(llmsPath, 'utf8');
  return readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(skillsDir, entry.name, 'SKILL.md')))
    .map((entry) => entry.name)
    .filter((name) => !listedIn(llms, name))
    .sort();
}

const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const root = new URL('../', import.meta.url);
  const missing = findUnlistedSkills(fileURLToPath(new URL('skills/', root)), fileURLToPath(new URL('llms.txt', root)));
  if (missing.length) {
    console.error(`skills missing from llms.txt: ${missing.join(', ')}`);
    process.exitCode = 1;
  } else {
    console.log('every skill is listed in llms.txt');
  }
}
