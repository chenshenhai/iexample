export type CodeType =
  | "javascript"
  | "vue"
  | "typescript"
  | "json"
  | "html"
  | "css"
  | "text";

export type CodeFileType =
  | "javascript"
  | "json"
  | "html"
  | "css"
  | "plaintext";


export interface CodeFile {
  path: string;
  name: string;
  type: "file" | "folder";
  content: string;
  codeTyoe: CodeType,
  fileType: CodeFileType;
  children?: Array<CodeFile>;
}

export type CodeDirectory = Array<CodeFile>;