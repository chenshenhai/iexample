export type ModuleEntity = any;

export interface DefineModule {
  name : string,
  dependencies : string[],
  factory : Function,
  entity: any,
}