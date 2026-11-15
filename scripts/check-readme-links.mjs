import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const defaultReadme = fileURLToPath(new URL('../README.md', import.meta.url));
const linkPattern = /https?:\/\/[^\s<>"'`)]+/g;
const timeoutMs = 20_000;

export function extractLinks(markdown) {
  const links = new Set();
  for (const match of markdown.matchAll(linkPattern)) {
    links.add(match[0].replace(/[.,;:]+$/, ''));
  }
  return [...links].sort();
}

function isBadge(url, response) {
  const pathname = new URL(url).pathname;
  return pathname.includes('/b/') || /svg/.test(response.headers.get('content-type') ?? '');
}

async function checkLink(url) {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(timeoutMs),
      headers: { 'user-agent': 'flisk-skills-readme-link-check' },
    });
    if (!response.ok) return `${url}: HTTP ${response.status}`;
    if (isBadge(url, response)) {
      const body = await response.text();
      if (/resource not found/i.test(body)) {
        return `${url}: HTTP ${response.status} but the badge says "resource not found"`;
      }
    }
    return null;
  } catch (error) {
    const reason = error.name === 'TimeoutError'
      ? `timed out after ${timeoutMs / 1000}s`
      : error.message;
    return `${url}: unreachable (${reason})`;
  }
}

export async function checkReadmeLinks(readmePath = defaultReadme) {
  const links = extractLinks(await readFile(readmePath, 'utf8'));
  if (links.length === 0) throw new Error(`no external links found in ${readmePath}`);

  const failures = (await Promise.all(links.map(checkLink))).filter(Boolean);
  if (failures.length > 0) throw new Error(failures.join('\n'));
  return links.length;
}

const isMain = process.argv[1]
  && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (isMain) {
  try {
    const count = await checkReadmeLinks(process.argv[2] ? resolve(process.argv[2]) : defaultReadme);
    console.log(`Checked ${count} README link${count === 1 ? '' : 's'}.`);
  } catch (error) {
    console.error(`README link check failed:\n${error.message}`);
    process.exitCode = 1;
  }
}
