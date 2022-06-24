import { compose } from "./compose";
import type { Middleware } from './compose'
import type { DefineModule } from "./type";
import { isNPM } from "./util";

const modStorage: { [key: string]: DefineModule } = {};

async function define(
  name?: string | any[] | Function,
  dependencies?: any[] | Function,
  callback?: Function
) {
  let modName = "";
  let modDeps: any[] = [];
  let modFn: Function = () => {};
  let canEmit = false;
  let canExec = false;

  if (name && dependencies && callback) {
    if (typeof name === "string") {
      modName = name;
    }
    if (Array.isArray(dependencies)) {
      modDeps = dependencies;
    }
    modFn = callback;
  } else {
    if (dependencies) {
      if (typeof name === "string" && typeof dependencies === "function") {
        modName = name;
        modDeps = [];
        modFn = dependencies;
        canExec = true;
      } else if (Array.isArray(name) && typeof dependencies === "function") {
        modDeps = name;
        modFn = dependencies;
        modName = "temp-uuid-" + new Date().getTime();
        canEmit = true;
      }
    } else {
      if (typeof name === "function") {
        modName = "temp-uuid-" + new Date().getTime();
        modDeps = [];
        modFn = name;
        canEmit = true;
      } else {
        return false;
      }
    }
  }
  if (canExec) {
    const modObj: DefineModule = {
      name: modName,
      dependencies: modDeps,
      callback: modFn,
      content: modFn(),
      isLoaded: true,
    };
    modStorage[modName] = modObj;
    return modStorage[modName];
  }

  if (!modStorage.hasOwnProperty(modName)) {
    const modObj: DefineModule = {
      name: modName,
      dependencies: modDeps,
      callback: modFn,
      content: null,
      isLoaded: false,
    };
    modStorage[modName] = modObj;
  }
  if (canEmit) {
    await emit(modName);
  } else {
    return modStorage[modName];
  }
}

type TaskContext = {
  contentList: any[];
};

async function emit(name: string) {
  const module: DefineModule = modStorage[name];
  const tasks: Middleware[] = [];
  const taskContext: TaskContext = { contentList: [] };
  let content: any = undefined;
  if (module?.isLoaded === true) {
    return module.content;
  } else {
    for (let i = 0, len = module.dependencies.length; i < len; i++) {
      const depName = module.dependencies[i];
      if (modStorage.hasOwnProperty(depName) && modStorage[depName].isLoaded) {
        tasks.push(async (ctx: TaskContext, next) => {
          ctx.contentList.push(modStorage[depName].content);
          await next();
        });
      } else if (isNPM(depName)) {
        tasks.push(async (ctx: TaskContext, next) => {
          let esModule: any = null;
          try {
            /*  @vite-ignore */
            esModule = await import(depName);
          } catch (err) {
            console.warn(err);
          }
          modStorage[depName] = {
            name: depName,
            dependencies: [],
            content: esModule,
            callback: null,
            isLoaded: true,
          };
          ctx.contentList.push(esModule);
          await next();
        });
      } else {
        tasks.push(async (ctx: TaskContext, next) => {
          let defModule: any;
          try {
            defModule = await emit(depName);
          } catch (err) {
            console.warn(err);
            defModule = null;
          }
          modStorage[depName].isLoaded = true;
          ctx.contentList.push(defModule);
          await next();
        });
      }
    }
    await compose(tasks)(taskContext);
    content = await module?.callback?.apply(function () {},
    taskContext.contentList);
  }
  modStorage[name] = {
    name,
    dependencies: [...module.dependencies],
    content,
    callback: module.callback,
    isLoaded: true,
  };
  return modStorage[name]?.content;
}

define._getModules = function () {
  return modStorage;
};

export default define;
