const { execSync } = require('child_process');
const { writeFileSync } = require('fs');
const { join } = require('path');

const projectsPath = join(__dirname, '..', 'projects');
const juliettePath = join(projectsPath, 'juliette');
const julietteNgPackageJsonPath = join(projectsPath, 'juliette-ng', 'package.json');

const versionType = process.env.VERSION_TYPE || 'patch';
const version = execSync(`cd ${juliettePath} && npm version ${versionType}`)
  .toString()
  .replace(/[^0-9.]/g, '');

const julietteNgPackageJson = require(julietteNgPackageJsonPath);
const updatedJulietteNgPackageJson = {
  ...julietteNgPackageJson,
  version,
  peerDependencies: {
    ...julietteNgPackageJson.peerDependencies,
    juliette: version,
  },
};

writeFileSync(julietteNgPackageJsonPath, JSON.stringify(updatedJulietteNgPackageJson, null, 2));
