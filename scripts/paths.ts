import { join } from 'path';

export const rootPath = join(__dirname, '..');
export const getProjectPath = (projectName: string): string =>
  join(rootPath, 'projects', projectName);
export const getDistPath = (projectName: string): string => join(rootPath, 'dist', projectName);
