import { build } from 'vite';
import chalk from 'chalk';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { UserConfig } from 'vite';
import { resolvePackagePath } from './util/project';
import { lessOptions } from './config/less';
import pkg from '../packages/iexample/package.json';

const externals = Object.keys(pkg?.dependencies || {})

const nodeNames = [
  {
    dirName: 'bin',
  },
  {
    dirName: 'server',
  }
]


start();

async function start() {
  for (let i = 0; i < nodeNames.length; i++) {
    const name = nodeNames[i].dirName
    const viteConfig = getViteConfig(name);
    const result = await build({
      configFile: false,
      ...viteConfig
    });
    console.log(chalk.green(`build packages/iexample/src/${name}  success!`));
  }
  console.log(chalk.green(`build source success!`));
}

function getViteConfig(name: string): UserConfig {
  const viteConfig: UserConfig = {
    build: {
      minify: false,
      outDir: resolvePackagePath('iexample', 'dist', name),
      lib: {
        entry: resolvePackagePath('iexample', 'src', name, 'index.ts'),
        formats: ['cjs'],
        fileName: (format) => {
          return `index.js`;
        },
      },
      rollupOptions: {
        // external: ['vue', 'vue/compiler-sfc']
        external: externals,
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

