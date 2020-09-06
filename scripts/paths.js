const { join } = require('path');

exports.rootPath = join(__dirname, '..');
exports.getProjectPath = projectName => join(exports.rootPath, 'projects', projectName);
exports.getDistPath = projectName => join(exports.rootPath, 'dist', projectName);
