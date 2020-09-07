import { execSync } from 'child_process';
import { getDistPath } from './paths';

const isCommitted = execSync('git diff').toString().length === 0;
if (!isCommitted) throw new Error('Please commit or stash changes before publish!');

const publish = (projectName: string) => {
  console.log(`Publishing ${projectName}...`);
  execSync(`cd ${getDistPath(projectName)} && npm publish`, { stdio: 'inherit' });
};

publish('juliette');
publish('juliette-ng');
publish('juliette-react');
