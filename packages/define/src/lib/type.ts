export type ModuleContent = any;

export interface DefineModule {
  name: string;
  dependencies: string[];
  callback: Function | null;
  content: any;
  isLoaded: boolean;
}
