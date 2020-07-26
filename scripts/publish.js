const { execSync } = require('child_process');
const { writeFileSync } = require('fs');
const { join } = require('path');

const isCodeCommitted = execSync('git diff').toString().length === 0;
if (!isCodeCommitted) throw new Error('Please commit or stash changes before publish!');

const rootPath = join(__dirname, '..');
const distPath = join(rootPath, 'dist');
const julietteDistPath = join(distPath, 'juliette');
const julietteNgDistPath = join(distPath, 'juliette-ng');
const readmePath = join(rootPath, 'README.md');
const projectInfoPath = join(rootPath, 'project-info.json');
const juliettePackageJsonPath = join(julietteDistPath, 'package.json');
const julietteNgPackageJsonPath = join(julietteNgDistPath, 'package.json');

const projectInfo = require(projectInfoPath);
const juliettePackageJson = require(juliettePackageJsonPath);
const julietteNgPackageJson = require(julietteNgPackageJsonPath);

console.log('copying README...');
execSync(`cp -r ${readmePath} ${julietteDistPath} && cp -r ${readmePath} ${julietteNgDistPath}`, { stdio: 'inherit' });
console.log('copying project.info...');
writeFileSync(juliettePackageJsonPath, JSON.stringify({ ...juliettePackageJson, ...projectInfo }, null, 2));
writeFileSync(julietteNgPackageJsonPath, JSON.stringify({ ...julietteNgPackageJson, ...projectInfo }, null, 2));
console.log('publishing...');
execSync(`cd ${julietteDistPath} && npm publish && cd ${julietteNgDistPath} && npm publish`, { stdio: 'inherit' });
