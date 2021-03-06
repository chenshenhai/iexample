import { build } from 'vite';
import chalk from 'chalk';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import type { UserConfig } from 'vite';
import rollupReplace from "@rollup/plugin-replace";
import rollupPolyfillNode from "rollup-plugin-polyfill-node/dist/index";
import rollupNodeResolve from "@rollup/plugin-node-resolve";
import rollupInject from '@rollup/plugin-inject';
import { resolvePackagePath } from './util/project';
import { modulePackages } from './config/package'
import { generateDts } from './util/dts';
import { lessOptions } from './config/less';

start();

async function start() {
  for (let i = 0; i < modulePackages.length; i++) {
    const { dirName, globalName } = modulePackages[i];
    const formats = modulePackages[i].formats as ("es" | "cjs" | "umd")[];
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
        external: ['vue', 'vue/compiler-sfc'],
        plugins: [
          rollupInject({
            process: ['process', '*'],
            Buffer: ['buffer', '*']
          }),
          rollupReplace({
            preventAssignment: true,
            values: {
              "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
              // BABEL_VERSION: JSON.stringify(babelVersion),
              // VERSION: JSON.stringify(version),
            },
          }),
          rollupNodeResolve({
            extensions: [".ts", ".js", ".mjs", ".cjs", ".json"],
            browser: true,
            exportConditions: ["browser"],
            // It needs to be set to 'false' when using rollupNodePolyfills
            // https://github.com/rollup/plugins/issues/772
            preferBuiltins: false,
          }),
          rollupPolyfillNode({
            include: [
              resolvePackagePath('packages', 'compiler')
            ]
          })
        ]
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

