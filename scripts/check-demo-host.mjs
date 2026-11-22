import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const OLD_HOST = 'demo.flisk.' + 'sh';
const DEFAULT_ROOT = fileURLToPath(new URL('..', import.meta.url));
const TEXT = /\.(md|txt|ya?ml|mjs|js|json|sh)$/;

export function findOldDemoHosts(root = DEFAULT_ROOT) {
  const stale = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (name === '.git' || name === 'node_modules') continue;
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (TEXT.test(name) && readFileSync(path, 'utf8').includes(OLD_HOST)) stale.push(path);
    }
  };
  walk(root);
  return stale;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const stale = findOldDemoHosts();
  if (stale.length) {
    console.error(`Old demo host still referenced in:\n${stale.join('\n')}`);
    process.exit(1);
  }
  console.log('No stale demo host references');
}
