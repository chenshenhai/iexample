import fs from 'fs';

export function readFile(filePath: string): string | null {
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const text = fs.readFileSync(filePath, { encoding: 'utf8' });
    return text;
  }
  return null;
}
