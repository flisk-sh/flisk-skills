import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const cwd = new URL('..', import.meta.url);
const run = (...args) => spawnSync('sh', ['./install.sh', ...args], { cwd, encoding: 'utf8' });

test('help prints usage to stdout and exits successfully', () => {
  for (const flag of ['-h', '--help']) {
    const result = run(flag);
    assert.equal(result.status, 0);
    assert.match(result.stdout, /^usage: install\.sh /);
    assert.equal(result.stderr, '');
  }
});

test('invalid arguments print usage to stderr and exit with status 2', () => {
  for (const args of [['--bogus'], ['--agent'], ['--agent', 'invalid']]) {
    const result = run(...args);
    assert.equal(result.status, 2);
    assert.equal(result.stdout, '');
    assert.match(result.stderr, /^usage: install\.sh /);
  }
});
