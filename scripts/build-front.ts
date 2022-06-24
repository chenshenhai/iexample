import { build } from 'vite';
import chalk from 'chalk';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import type { UserConfig } from 'vite';
import { resolvePackagePath } from './util/project';
import { generateDts } from './util/dts';
import { lessOptions } from './config/less';

start();

async function start() {
  const pkgName = 'iexample';
  const viteConfig = getViteConfig(pkgName);
  await build({
    configFile: false,
    ...viteConfig
  });
  console.log(chalk.green(`build packages/${pkgName}/src  success!`));
  console.log(chalk.green(`build source success!`));
}

function getViteConfig(pkgName: string): UserConfig {
  const viteConfig: UserConfig = {
    build: {
      minify: false,
      outDir: resolvePackagePath(pkgName, 'dist', 'front'),
      lib: {
        name: 'iExample',
        entry: resolvePackagePath(pkgName, 'src', 'front', 'index.ts'),
        formats: ['iife'],
        fileName: (format) => {
          return `index.js`;
        },
      },
      rollupOptions: {
        // external: ['vue', 'vue/compiler-sfc']
      }
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
  };
  return viteConfig;
}

