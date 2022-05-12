import path from 'path';
import fs from 'fs';

export function resolvePackagePath(...args) {
  const pathList = Array.from(args);
  const baseDir = path.join(resolveProjectPath(), 'packages');
  return path.join(baseDir, ...pathList);
}

export function resolveProjectPath(...args) {
  const pathList = Array.from(args);
  const baseDir = path.join(__dirname, '..', '..');
  return path.join(baseDir, ...pathList);
}

export function getTsConfig() {
  const configPath = resolveProjectPath('tsconfig.json')
  const configStr = fs.readFileSync(configPath, { encoding: 'utf8' });
  const config = JSON.parse(configStr);
  return config;
}
