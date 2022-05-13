import { build } from 'vite';


import chalk from 'chalk';
import vue from '@vitejs/plugin-vue'
import { createServer, UserConfig } from 'vite';
import { resolvePackagePath } from './util/project';
import { packages } from './config'

dev();

async function dev() {
  const pkgName = 'util';
  const viteConfig = getViteConfig(pkgName);
  const output = await build({
    configFile: false,
    ...viteConfig
  })
  console.log('output ===', output)
  
  console.log(chalk.green(`success!`));
}

function getViteConfig(pkgName): UserConfig {
  const viteConfig: UserConfig = {
    build: {
      minify: false,
      outDir: resolvePackagePath(pkgName, 'dist'),
      lib: {
        entry: resolvePackagePath(pkgName, 'src', 'index.ts'),
        formats: ['es'],
        fileName: () => 'index.esm.js',
      },
      rollupOptions: {
        external: ['vue', 'vue/compiler-sfc']
      }
    },
    plugins: [
      vue(),
    ],
  };
  return viteConfig;
}

