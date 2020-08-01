const { join } = require('path');

exports.rootPath = join(__dirname, '..');
exports.projectsPath = join(exports.rootPath, 'projects');
exports.distPath = join(exports.rootPath, 'dist');

exports.readmePath = join(exports.rootPath, 'README.md');
exports.projectInfoPath = join(exports.rootPath, 'project-info.json');

exports.julietteDirName = 'juliette';
exports.julietteNgDirName = 'juliette-ng';
exports.julietteReactDirName = 'juliette-react';

exports.getLibraryProjectPath = libraryName => join(exports.projectsPath, libraryName);
exports.getLibraryProjectPackageJsonPath = libraryName =>
  join(exports.getLibraryProjectPath(libraryName), 'package.json');
exports.getLibraryDistPath = libraryName => join(exports.distPath, libraryName);
exports.getLibraryDistPackageJsonPath = libraryName => join(exports.getLibraryDistPath(libraryName), 'package.json');
