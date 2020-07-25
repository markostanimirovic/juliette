const { exec, execSync } = require('child_process');
const { join } = require('path');

const isCodeCommitted = execSync('git diff').toString().length === 0;
if (!isCodeCommitted) throw new Error('Please commit or stash changes before publish!');

const distPath = join(__dirname, '..', 'dist');
const julietteDistPath = join(distPath, 'juliette');
const julietteNgDistPath = join(distPath, 'juliette-ng');

exec(`cd ${julietteDistPath} && npm publish && cd ${julietteNgDistPath} && npm publish`).stdout.pipe(process.stdout);
