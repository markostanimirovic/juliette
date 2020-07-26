const { execSync } = require('child_process');
const { writeFileSync } = require('fs');
const readline = require('readline');
const { juliettePath, julietteNgPackageJsonPath } = require('./paths');

const getVersionType = () => {
  const versionTypeReadline = readline.createInterface({ input: process.stdin, output: process.stdout });
  const allVersionTypes = ['patch', 'minor', 'major'];
  const defaultVersionType = allVersionTypes[0];

  return new Promise(resolve =>
    versionTypeReadline.question(`Enter version type (${allVersionTypes.join('/')}): `, versionType => {
      versionTypeReadline.close();
      resolve(allVersionTypes.indexOf(versionType) > -1 ? versionType : defaultVersionType);
    }),
  );
};

(async () => {
  const versionType = await getVersionType();

  console.log('Updating juliette version...');
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

  console.log('Updating juliette-ng version...');
  writeFileSync(julietteNgPackageJsonPath, JSON.stringify(updatedJulietteNgPackageJson, null, 2));
})();
