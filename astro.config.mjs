import cloudflare from '@astrojs/cloudflare';
import db from '@astrojs/db';
import node from '@astrojs/node';
import solidJs from '@astrojs/solid-js';
import { defineConfig } from 'astro/config';
import styleX from 'vite-plugin-stylex';

/**
 * @see {@link https://astro.build/config}
 */
export default defineConfig({
  output: 'hybrid',

  adapter: node({ mode: 'middleware' }),

  integrations: [
    /**
     * @npm {@link https://docs.astro.build/ja/guides/astro-db} Documents
     * @npm {@link https://www.npmjs.com/package/@astrojs/db} npm
     */
    db(),

    /**
     * @npm {@link https://docs.astro.build/en/guides/integrations-guide/solid-js} Documents
     * @npm {@link https://www.npmjs.com/package/@astrojs/solid-js} npm
     */
    solidJs(),
  ],

  vite: {
    plugins: [
      /**
       * @npm {@link https://github.com/HorusGoul/vite-plugin-stylex#readme} Documents
       * @npm {@link https://www.npmjs.com/package/vite-plugin-stylex} npm
       */
      styleX(),
    ],

    build: {
      terserOptions: {
        compress: {
          passes: 2,
        },
      },
    },
  },
});
