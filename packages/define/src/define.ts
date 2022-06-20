
const modStorage: {[key: string]: any} = {};

function define(name?: string | any[], dependencies?: any[] | Function, factory?: Function) {
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
      }
      else if (Array.isArray(name)  && typeof dependencies === "function" ) {
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
    let modObj = {
      name : modName,
      dependencies : modDeps,
      factory : modFn
    };
    modStorage[modName] = modObj;
  }
  if(canExec) {
    emit(modName);
  } else {
    return modStorage[modName];
  }
};

const emit = function(name: string){
  let module = modStorage[name];

  if( typeof module.entity === "undefined") {
    let _args = [];

    for( let i= 0, len = module.dependencies.length; i<len; i++ ) {
      let _entity = module.dependencies[i].entity;

      if( typeof _entity !== "undefined" ) {
        _args.push(_entity);
      } else {
        _args.push(emit(module.dependencies[i]));
      }
    }
    module.entity = module.factory.apply(function(){}, _args);
  }
  return module.entity;
};

// window.define = function(name, dependencies, factory){
//   define(name, dependencies, factory)
// };


export default define;