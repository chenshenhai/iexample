import type CodeMirror from "codemirror";

export type ICodeEditor = typeof CodeMirror & {};

export type PlaygroundTheme = "light" | "dark";

export type CodeType =
  | "javascript"
  | "typescript"
  | "json"
  | "html"
  | "css"
  | "plaintext";

// export interface IProject {
//   name: string;
// }

export interface CodeFile {
  path: string;
  name: string;
  type: "file" | "folder";
  content: string;
  fileType: CodeType;
  children?: Array<CodeFile>;
}

export type CodeDirectory = Array<CodeFile>;

export type IResultStatus = "LOADING" | "LOADED" | "NOT_FOUND" | "NOT_FINISHED";

export interface DocFile {
  name: string;
  path: string;
  children?: DocFile[];
}

export type DocDirectory = Array<DocFile>;
