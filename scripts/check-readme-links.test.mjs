import assert from 'node:assert/strict';
import test from 'node:test';
import { extractLinks } from './check-readme-links.mjs';

test('extracts markdown links, badges and raw HTML sources without trailing punctuation', () => {
  const markdown = [
    '[![skills.sh](https://skills.sh/b/flisk-sh/tdk-skills)](https://skills.sh/flisk-sh/tdk-skills)',
    'See [the site](https://flisk.sh/) and <https://flisk.sh/llms.txt>.',
    "<img src='https://raw.githubusercontent.com/flisk-sh/flisk-emoji/main/png/flisk-thunder-64.png' width='20'>",
  ].join('\n');

  assert.deepEqual(extractLinks(markdown), [
    'https://flisk.sh/',
    'https://flisk.sh/llms.txt',
    'https://raw.githubusercontent.com/flisk-sh/flisk-emoji/main/png/flisk-thunder-64.png',
    'https://skills.sh/b/flisk-sh/tdk-skills',
    'https://skills.sh/flisk-sh/tdk-skills',
  ]);
});

test('deduplicates links that appear more than once', () => {
  const markdown = 'https://a.example/ and [again](https://a.example/)';
  assert.deepEqual(extractLinks(markdown), ['https://a.example/']);
});
