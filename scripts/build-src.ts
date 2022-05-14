import { build } from 'vite';
import chalk from 'chalk';
import vue from '@vitejs/plugin-vue'
import { createServer, UserConfig } from 'vite';
import { resolvePackagePath } from './util/project';
import { packages } from './config/package'

dev();

async function dev() {
  for (let i = 0; i < packages.length; i++) {
    const pkgName = packages[i].dirName
    const viteConfig = getViteConfig(pkgName);
    const result = await build({
      configFile: false,
      ...viteConfig
    });
    console.log(chalk.green(`build packages/${pkgName}/src  success!`));
  }
  console.log(chalk.green(`build source success!`));
}

function getViteConfig(pkgName): UserConfig {
  const viteConfig: UserConfig = {
    build: {
      minify: false,
      emptyOutDir: false,
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

