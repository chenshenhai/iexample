export interface CompileOptions {
  id?: string;
  filename?: string;
}

export interface CompileResult {
  code: string;
  ast: any[] | any | null;
}
