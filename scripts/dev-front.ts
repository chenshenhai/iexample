import chalk from 'chalk';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createServer } from 'vite';
import type { UserConfig } from 'vite';
import { resolvePackagePath } from './util/project';
import { lessOptions } from './config/less';

dev();

async function dev() {
  const pkgName = 'iexample';
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
    // publicDir: resolvePackagePath(pkgName),
    publicDir: resolvePackagePath(pkgName, 'demo', 'public'),
    server: {
      port: 8080,
      host: '127.0.0.1',
      proxy: {
        // '/api/*': 'http://127.0.0.1:8081/api/*',
        '/api': {
          target: 'http://127.0.0.1:8081',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api')
        },
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
    esbuild: {
      include: [
        /\.ts$/,
        /\.js$/,
      ],
      exclude: [
        /\.html$/
      ]
    },
  };
  return viteConfig;
}

