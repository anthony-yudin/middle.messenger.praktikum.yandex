import { defineConfig } from 'vite';
import { resolve } from 'path';
import createSvgSpritePlugin from 'vite-plugin-svg-spriter';

const SRC_PATH = resolve(__dirname, 'src/static/img/svg')

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
        relativeUrls: true,
        javascriptEnabled: true
      },
    },
    postcss: './postcss.config.js',
  },
  plugins: [createSvgSpritePlugin({svgFolder: SRC_PATH})],
});
