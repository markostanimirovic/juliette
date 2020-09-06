const { execSync } = require('child_process');
const { getDistPath } = require('./paths');

const isCommitted = execSync('git diff').toString().length === 0;
if (!isCommitted) throw new Error('Please commit or stash changes before publish!');

const publish = projectName => {
  console.log(`Publishing ${projectName}...`);
  execSync(`cd ${getDistPath(projectName)} && npm publish`, { stdio: 'inherit' });
};

publish('juliette');
publish('juliette-ng');
publish('juliette-react');
