import { build } from 'vite';
import chalk from 'chalk';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { UserConfig } from 'vite';
import { resolvePackagePath } from './util/project';
import { modulePackages } from './config/package'
import { generateDts } from './util/dts';
import { lessOptions } from './config/less';

start();

async function start() {
  for (let i = 0; i < modulePackages.length; i++) {
    const { dirName, globalName, formats } = modulePackages[i];
    const pkgName = dirName;
    const viteConfig = getViteConfig(pkgName, globalName, formats);
    const result = await build({
      configFile: false,
      ...viteConfig
    });
    generateDts(pkgName);
    console.log(chalk.green(`build packages/${pkgName}/src  success!`));
  }
  console.log(chalk.green(`build source success!`));
}

function getViteConfig(pkgName: string, name: string, formats: Array<'es' |'cjs' | 'umd'>): UserConfig {
  const viteConfig: UserConfig = {
    build: {
      minify: false,
      outDir: resolvePackagePath(pkgName, 'dist'),
      lib: {
        name,
        entry: resolvePackagePath(pkgName, 'src', 'index.ts'),
        formats,
        fileName: (format) => {
          return `index.${format}.js`;
        },
      },
      rollupOptions: {
        external: ['vue', 'vue/compiler-sfc']
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

