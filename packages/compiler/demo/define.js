(function() {
  var __AMD__ = {};

  var __AMDModuleStorage__ = {};

  /*
  * @name define
  * @param {string} name 
  * @param {array} dependencies 
  * @param {function} factory 
  * @return {object}
  * */
  __AMD__.define = function(name, dependencies, factory){

    var that = this;

    var _name, _dependencies, _factory;
    var _exec = false;

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
      var _module = {
        name : _name,
        dependencies : _dependencies,
        factory : _factory
      };

      __AMDModuleStorage__[_name] = _module;
    }


    if( _exec ) {
      that.emit(_name);
    } else {
      return __AMDModuleStorage__[_name];
    }
  };


  /*
  * 发射模块
  * @name emit
  * @param {string} name 模块名字
  * @return {}
  * */
  __AMD__.emit = function(name){
    var that = this;
    var module = __AMDModuleStorage__[name];

    if( typeof module.entity === "undefined") {
      var _args = [];

      for( var i= 0, len=module.dependencies.length; i<len; i++ ) {
        var _entity = module.dependencies[i].entity;

        if( typeof _entity !== "undefined" ) {
          _args.push(_entity);
          console.log(_entity);
        } else {
          _args.push(that.emit(module.dependencies[i]));
          console.log(that.emit(module.dependencies[i]));
        }
      }
      module.entity = module.factory.apply(function(){}, _args);


    }

    return module.entity;
  };

  /*
  * @name require
  * @param {string} name
  * */
  __AMD__.require = function(name) {
    return this.emit(name);
  };


  //TODO
  //window.__AMD__ = __AMD__;
  //__AMD__.debug = {
  //  getModuleStroage : function() {
  //    console.log(__AMDModuleStorage__);
  //  }
  //};

  window.define = function(name, dependencies, factory){
    __AMD__.define(name, dependencies, factory)
  };

  window.require = function(name ){
    return __AMD__.require(name )
  };

})()