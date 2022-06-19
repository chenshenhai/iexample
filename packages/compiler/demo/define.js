(function() {

  const __AMDModuleStorage__ = {};

  const define = function(name, dependencies, factory){
    let _name, _dependencies, _factory;
    let _exec = false;

    if( factory ) {
      _name = name;
      _dependencies = dependencies;
      _factory = factory;
    } else {
      if( dependencies ) {
        if( typeof name === "string" && typeof dependencies === "function") {
          _name = name;
          _dependencies = [];
          _factory = dependencies;
        }
        else if( name instanceof Array && typeof dependencies === "function" ) {
          _dependencies = name;
          _factory = dependencies;
          _name = "temp-" + new Date().getTime();
          _exec = true;
        }

      } else {
        if( typeof name === "function") {
          _name = "temp-" + new Date().getTime();
          _dependencies = [];
          _factory = name;
          _exec = true;
        } else {
          return false;
        }
      }
    }

    if( !__AMDModuleStorage__.hasOwnProperty(_name) ) {
      let _module = {
        name : _name,
        dependencies : _dependencies,
        factory : _factory
      };
      __AMDModuleStorage__[_name] = _module;
    }
    if( _exec ) {
      emit(_name);
    } else {
      return __AMDModuleStorage__[_name];
    }
  };

  const emit = function(name){
    let module = __AMDModuleStorage__[name];

    if( typeof module.entity === "undefined") {
      let _args = [];

      for( let i= 0, len=module.dependencies.length; i<len; i++ ) {
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
  window.__AMDModuleStorage__ = __AMDModuleStorage__

})()