const { execSync } = require('child_process');
const { writeFileSync } = require('fs');
const readline = require('readline');
const {
  julietteDirName,
  julietteNgDirName,
  julietteReactDirName,
  getLibraryProjectPath,
  getLibraryProjectPackageJsonPath,
} = require('./paths');

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

const updatePluginLibraryVersion = (libraryName, version) => {
  const libraryPackageJsonPath = getLibraryProjectPackageJsonPath(libraryName);
  const libraryPackageJson = require(libraryPackageJsonPath);
  const updatedLibraryPackageJson = {
    ...libraryPackageJson,
    version,
    peerDependencies: {
      ...libraryPackageJson.peerDependencies,
      juliette: version,
    },
  };

  console.log(`Updating ${libraryName} version...`);
  writeFileSync(libraryPackageJsonPath, JSON.stringify(updatedLibraryPackageJson, null, 2));
};

(async () => {
  const versionType = await getVersionType();

  console.log(`Updating ${julietteDirName} version...`);
  const version = execSync(`cd ${getLibraryProjectPath(julietteDirName)} && npm version ${versionType}`)
    .toString()
    .replace(/[^0-9.]/g, '');

  updatePluginLibraryVersion(julietteNgDirName, version);
  updatePluginLibraryVersion(julietteReactDirName, version);
})();
