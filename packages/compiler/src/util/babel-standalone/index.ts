// Thanks to: https://github.com/babel/babel/tree/main/packages/babel-standalone

import {
  transformFromAstSync as babelTransformFromAstSync,
  transformSync as babelTransformSync
} from '@babel/core';

// @ts-ignore
import presetReact from '@babel/preset-react';
// @ts-ignore
import presetTypescript from '@babel/preset-typescript';
// @ts-ignore
import type { InputOptions } from '@babel/core';

import { runScripts } from './transformScriptTags';

const isArray =
  Array.isArray ||
  (arg => Object.prototype.toString.call(arg) === '[object Array]');

function loadBuiltin(builtinTable: Record<string, unknown>, name: any) {
  if (isArray(name) && typeof name[0] === 'string') {
    if (Object.prototype.hasOwnProperty.call(builtinTable, name[0])) {
      return [builtinTable[name[0]]].concat(name.slice(1));
    }
    return;
  } else if (typeof name === 'string') {
    return builtinTable[name];
  }
  // Could be an actual preset/plugin module
  return name;
}

function processOptions(options: InputOptions) {
  // Parse preset names
  const presets = (options.presets || []).map((presetName: string) => {
    const preset = loadBuiltin(availablePresets, presetName);

    if (preset) {
      if (
        isArray(preset) &&
        typeof preset[0] === 'object' &&
        Object.prototype.hasOwnProperty.call(preset[0], 'buildPreset')
      ) {
        preset[0] = { ...preset[0], buildPreset: preset[0].buildPreset };
      }
    } else {
      throw new Error(
        `Invalid preset specified in Babel options: "${presetName}"`
      );
    }
    return preset;
  });

  // Parse plugin names
  const plugins = (options.plugins || []).map((pluginName: string) => {
    const plugin = loadBuiltin({}, pluginName);

    if (!plugin) {
      throw new Error(
        `Invalid plugin specified in Babel options: "${pluginName}"`
      );
    }
    return plugin;
  });

  return {
    babelrc: false,
    ...options,
    presets,
    plugins
  };
}

export function transform(code: string, options: InputOptions) {
  return babelTransformSync(code, processOptions(options));
}

export function transformFromAst(
  ast: Parameters<typeof babelTransformFromAstSync>[0],
  code: string,
  options: InputOptions
) {
  return babelTransformFromAstSync(ast, code, processOptions(options));
}

const availablePresets = {
  react: presetReact,
  typescript: presetTypescript
};

function onDOMContentLoaded() {
  transformScriptTags();
}

if (typeof window !== 'undefined' && window?.addEventListener) {
  window.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);
}

export function transformScriptTags(
  scriptTags?: HTMLCollectionOf<HTMLScriptElement>
) {
  runScripts(transform, scriptTags);
}
