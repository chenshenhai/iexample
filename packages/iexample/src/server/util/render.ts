
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export function renderPage(name: string) {
  const filePath = path.join(__dirname, '..', 'view', `${name}.html`);
  let content: string = '404 Not Found';
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    content = fs.readFileSync(filePath, { encoding: 'utf8' });
  }
  return content;
}