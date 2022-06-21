import { compose } from './compose';
import { DefineModule } from './type';

const modStorage: { [key: string]: DefineModule } = {};

function define(name?: string | any[] | Function, dependencies?: any[] | Function, factory?: Function) {
  let modName: string = '';
  let modDeps: any[] = []; 
  let modFn: Function = () => {};
  let canExec = false;

  if (name && dependencies && factory) {
    if (typeof name === 'string') {
      modName = name;
    }
    if (Array.isArray(dependencies)) {
      modDeps = dependencies;
    }
    modFn = factory;
  } else {
    if (dependencies) {
      if (typeof name === "string" && typeof dependencies === "function") {
        modName = name;
        modDeps = [];
        modFn = dependencies;
      } else if (Array.isArray(name)  && typeof dependencies === "function" ) {
        modDeps = name;
        modFn = dependencies;
        modName = "temp-uuid-" + new Date().getTime();
        canExec = true;
      }
    } else {
      if( typeof name === "function") {
        modName = "temp-uuid-" + new Date().getTime();
        modDeps = [];
        modFn = name;
        canExec = true;
      } else {
        return false;
      }
    }
  }

  if(!modStorage.hasOwnProperty(modName)) {
    const modObj = {
      name : modName,
      dependencies : modDeps,
      factory : modFn,
      entity: null,
    };
    modStorage[modName] = modObj;
  }
  if(canExec) {
    emit(modName);
  } else {
    return modStorage[modName];
  }
};

function emit(name: string){
  const module: DefineModule = modStorage[name];
  if(module.entity === null) {
    const argvs = [];
    for( let i = 0, len = module.dependencies.length; i<len; i++ ) {
      const depName = module.dependencies[i];
      if(modStorage.hasOwnProperty(depName) && modStorage[depName].entity) {
        argvs.push(modStorage[depName].entity);
      } else {
        argvs.push(emit(module.dependencies[i]));
      }
    }
    const entity = module.factory.apply(function(){}, argvs);
    modStorage[name] = {
      name,
      dependencies: [...module.dependencies],
      entity,
      factory: module.factory,
    }
  }
  return modStorage[name]?.entity;
};


define._getModules = function () {
  return modStorage;
}

export default define;