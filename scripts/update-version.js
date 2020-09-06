const { execSync } = require('child_process');
const { writeFileSync } = require('fs');
const readline = require('readline');
const os = require('os');
const { join } = require('path');
const { getProjectPath } = require('./paths');

const getVersionType = () => {
  const versionTypeReadline = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const allVersionTypes = ['patch', 'minor', 'major'];
  const defaultVersionType = allVersionTypes[0];

  return new Promise(resolve =>
    versionTypeReadline.question(
      `Enter version type (${allVersionTypes.join('/')}): `,
      versionType => {
        versionTypeReadline.close();
        resolve(allVersionTypes.indexOf(versionType) > -1 ? versionType : defaultVersionType);
      },
    ),
  );
};

const updatePluginVersion = (pluginName, version) => {
  const packageJsonPath = join(getProjectPath(pluginName), 'package.json');
  const packageJson = require(packageJsonPath);
  const updatedPackageJson = {
    ...packageJson,
    version,
    peerDependencies: {
      ...packageJson.peerDependencies,
      juliette: version,
    },
  };

  console.log(`Updating ${pluginName} version...`);
  writeFileSync(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2) + os.EOL);
};

(async () => {
  const versionType = await getVersionType();

  console.log(`Updating juliette version...`);
  const version = execSync(`cd ${getProjectPath('juliette')} && npm version ${versionType}`)
    .toString()
    .replace(/[^0-9.]/g, '');

  updatePluginVersion('juliette-ng', version);
  updatePluginVersion('juliette-react', version);
})();
