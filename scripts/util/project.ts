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


export function getPakcages(): string[] {
  const packagesDir = resolveProjectPath('packages');
  const packages: string[] = [];
  const dirs = fs.readdirSync(packagesDir);
  dirs.forEach((name) => {
    const pkgFile = resolveProjectPath('packages', name, 'package.json');
    if (fs.existsSync(pkgFile) && fs.statSync(pkgFile).isFile()) {
      packages.push(name);
    }
  });
  return packages;
}