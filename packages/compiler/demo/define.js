(function() {

  const modStorage = {};

  const define = function(name, dependencies, factory){
    let modName, modDeps, modFn;
    let canExec = false;

    if( factory ) {
      modName = name;
      modDeps = dependencies;
      modFn = factory;
    } else {
      if( dependencies ) {
        if( typeof name === "string" && typeof dependencies === "function") {
          modName = name;
          modDeps = [];
          modFn = dependencies;
        }
        else if( name instanceof Array && typeof dependencies === "function" ) {
          modDeps = name;
          modFn = dependencies;
          modName = "temp-" + new Date().getTime();
          canExec = true;
        }
      } else {
        if( typeof name === "function") {
          modName = "temp-" + new Date().getTime();
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
    if( canExec ) {
      emit(modName);
    } else {
      return modStorage[modName];
    }
  };

  const emit = function(name){
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

  window.define = function(name, dependencies, factory){
    define(name, dependencies, factory)
  };

  // window.require = function(name ){
  //   return require(name)
  // };
  window.__AMDModuleStorage__ = modStorage

})()