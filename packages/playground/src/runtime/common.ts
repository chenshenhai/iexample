import { toRaw } from 'vue';
import { formatPath } from '../util/format'


function getEntryContent(entryPath: string, directory: IProjectDirectory): string | null {
  for (let i = 0; i < directory.length; i++) {
    const file = directory[i];
    if (file.type === 'file') {

    }
  }
  return null;
}

export function runtime(entryPath: string, directory: IProjectDirectory): string {
  const dir = toRaw(directory);
  entryPath = formatPath(entryPath); 
  // TODO
  return ''
}