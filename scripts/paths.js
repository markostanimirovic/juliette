const { join } = require('path');

exports.rootPath = join(__dirname, '..');
exports.readmePath = join(exports.rootPath, 'README.md');
exports.projectInfoPath = join(exports.rootPath, 'project-info.json');

exports.distPath = join(exports.rootPath, 'dist');
exports.julietteDistPath = join(exports.distPath, 'juliette');
exports.julietteNgDistPath = join(exports.distPath, 'juliette-ng');
exports.julietteDistPackageJsonPath = join(exports.julietteDistPath, 'package.json');
exports.julietteNgDistPackageJsonPath = join(exports.julietteNgDistPath, 'package.json');

exports.projectsPath = join(exports.rootPath, 'projects');
exports.juliettePath = join(exports.projectsPath, 'juliette');
exports.julietteNgPath = join(exports.projectsPath, 'juliette-ng');
exports.juliettePackageJsonPath = join(exports.juliettePath, 'package.json');
exports.julietteNgPackageJsonPath = join(exports.julietteNgPath, 'package.json');
