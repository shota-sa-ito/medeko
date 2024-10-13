import cloudflare from '@astrojs/cloudflare';
import solidJs from '@astrojs/solid-js';
import { defineConfig } from 'astro/config';

/**
 * @see {@link https://astro.build/config}
 */
export default defineConfig({
  output: 'hybrid',

  adapter: cloudflare(),

  integrations: [
    /**
     * @npm {@link https://docs.astro.build/en/guides/integrations-guide/solid-js} Documents
     * @npm {@link https://www.npmjs.com/package/@astrojs/solid-js} npm
     */
    solidJs(),
  ],
});
