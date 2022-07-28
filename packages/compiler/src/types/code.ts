export interface CompileOptions {
  id?: string;
  filename?: string;
}

export interface CompileVueScriptOptions extends CompileOptions{
  ts?: boolean;
}

export interface CompileResult {
  code: string;
  ast: any[] | any | null;
}
