/**
 * Apply staged files from `.tmp/asset-opt/replacements.json` with retries.
 */
import fs from 'node:fs';
import path from 'node:path';

const cwd = process.cwd();
const manifestPath = path.join(cwd, '.tmp', 'asset-opt', 'replacements.json');

if (!fs.existsSync(manifestPath)) {
  console.error('Missing replacements.json — run node ./scripts/optimize-assets.mjs first');
  process.exit(1);
}

const items = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
let ok = 0;
let fail = 0;

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

for (const item of items) {
  if (item.deleteOnly) {
    let done = false;
    for (let i = 0; i < 10; i++) {
      try {
        if (fs.existsSync(item.dest)) fs.unlinkSync(item.dest);
        ok++;
        done = true;
        break;
      } catch {
        sleep(200 * (i + 1));
      }
    }
    if (!done) {
      console.warn('Could not delete', item.dest);
      fail++;
    }
    continue;
  }

  let done = false;
  for (let i = 0; i < 12; i++) {
    try {
      fs.copyFileSync(item.src, item.dest);
      ok++;
      done = true;
      break;
    } catch {
      sleep(250 * (i + 1));
    }
  }
  if (!done) {
    console.warn('Locked, kept staged:', path.relative(cwd, item.src), '->', path.relative(cwd, item.dest));
    fail++;
  }
}

console.log(`Applied=${ok} failed=${fail}`);
process.exit(fail > 0 ? 2 : 0);
