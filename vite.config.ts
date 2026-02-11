import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import { vitePluginForArco } from '@arco-plugins/vite-vue';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      vueJsx(),
      Pages({
        dirs: ['src/views'],
        extensions: ['vue', 'tsx', 'jsx'],
        routeBlockLang: 'yaml',
        importMode: 'async',
        extendRoute: (route) => {
          // console.log('Route generated:', route);
          return route;
        },
        onRoutesGenerated: (routes) => {
          // console.log('All routes generated:', routes);
          return routes;
        },
      }),
      Layouts({
        layoutsDirs: 'src/layouts',
        defaultLayout: 'default',
        extensions: ['tsx', 'jsx', 'vue'],
      }),
      vitePluginForArco({
        style: 'css',
      }),
      // Sentry插件，仅在生产环境启用
      mode === 'production' && env.VITE_SENTRY_DSN
        ? sentryVitePlugin({
            org: 'your-org',
            project: 'your-project',
            sourcemaps: {
              assets: './dist/**',
            },
          })
        : undefined,
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': '/src',
        '@core': '/src/core',
      },
    },
    build: {
      // 打包优化
      target: 'es2015',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
      // 代码分割
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
            arco: ['@arco-design/web-vue'],
            sentry: ['@sentry/vue'],
          },
        },
      },
      // 生成source map，仅在生产环境启用
      sourcemap: mode === 'production' && !!env.VITE_SENTRY_DSN,
    },
    server: {
      port: 3001,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
  };
});
