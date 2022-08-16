export interface DocFile {
  name: string;
  path: string;
  children?: DocFile[];
}

export type DocDirectory = Array<DocFile>;
