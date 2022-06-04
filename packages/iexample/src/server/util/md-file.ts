import path from 'path';
import { readFile } from './file';
// import {  } from 'marked';

interface MdFileOptions{
  baseDir: string
}

export class MdFile {
  private _opts: MdFileOptions;

  constructor(opts: MdFileOptions) {
    this._opts = opts;
  }

  readSummary(): string | null {
    const { baseDir } = this._opts;
    const filePath = path.join(baseDir, 'SUMMARY.md');
    return readFile(filePath);
  }

  readFile(filePath: string) {
    const { baseDir } = this._opts;
    const fullPath: string = path.join(baseDir, filePath);
    return readFile(fullPath);
  }
}