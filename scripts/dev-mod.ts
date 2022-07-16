// @ts-ignore
import AutoComplete from 'enquirer/lib/prompts/autocomplete';
import chalk from 'chalk';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createServer } from 'vite';
import type { UserConfig } from 'vite';
import NodeModulesPolyfills from '@esbuild-plugins/node-modules-polyfill/dist/index';
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill/dist/index';

import { resolvePackagePath } from './util/project';
import { modulePackages } from './config/package'
import { lessOptions } from './config/less';

dev();

async function dev() {
  const pkgName = await inputPackageName();
  const viteConfig = getViteConfig(pkgName);
  const server = await createServer({
    configFile: false,
    ...viteConfig
  })
  await server.listen()
  server.printUrls();
  const { port, host = '127.0.0.1' } = server.config?.server || {}
  console.log(
    `Open: ` + 
    chalk.green(
      `http://${host}:${port}/demo/index.html`
    )
  );
}

function getViteConfig(pkgName: string): UserConfig {
  const viteConfig: UserConfig = {
    root: resolvePackagePath(pkgName),
    publicDir: resolvePackagePath(pkgName, 'demo', 'public'),
    server: {
      port: 8080,
      host: '127.0.0.1',
    },
    plugins: [
      vue(),
      vueJsx(),
    ],
    css: {
      preprocessorOptions: {
        less: lessOptions
      }
    },
    esbuild: {
      include: [
        /\.ts$/,
        /\.js$/,
      ],
      exclude: [
        /\.html$/
      ]
    },
    optimizeDeps: {
      esbuildOptions: {
        // define: {
        //   global: 'globalThis',
        // },
        plugins: [
          NodeModulesPolyfills(),
          GlobalsPolyfills({
            buffer: true
          }),
        ]
      }
    }
  };
  return viteConfig;
}

async function inputPackageName() {
  const choices = modulePackages.map((pkg) => {
    return pkg.dirName;
  })
  const prompt = new AutoComplete({
    name: 'Package Name',
    message: 'Pick your dev package',
    limit: choices.length,
    initial: 0,
    choices: choices
  });
  // @ts-ignore
  const pkgName = await prompt.run();
  return pkgName;
}