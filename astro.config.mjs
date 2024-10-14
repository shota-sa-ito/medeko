import solidJs from '@astrojs/solid-js';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import styleX from 'vite-plugin-stylex';

/**
 * @see {@link https://astro.build/config}
 */
export default defineConfig({
  output: 'hybrid',

  adapter: vercel(),

  integrations: [
    /**
     * @npm {@link https://docs.astro.build/ja/guides/astro-db} Documents
     * @npm {@link https://www.npmjs.com/package/@astrojs/db} npm
     */
    // db(),

    /**
     * @npm {@link https://docs.astro.build/en/guides/integrations-guide/solid-js} Documents
     * @npm {@link https://www.npmjs.com/package/@astrojs/solid-js} npm
     */
    solidJs(),
  ],

  vite: {
    ssr: {
      noExternal: ['@astrojs/solid-js/server.js'],
    },

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
