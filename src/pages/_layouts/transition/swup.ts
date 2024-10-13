import SwupBodyClassPlugin from '@swup/body-class-plugin';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
import Swup from 'swup';

/**
 * @npm {@link https://swup.js.org/} Documents
 * @npm {@link https://www.npmjs.com/package/@swup/astro} npm
 */
window.swup = new Swup({
  plugins: [
    new SwupHeadPlugin(),
    new SwupPreloadPlugin(),
    new SwupBodyClassPlugin(),
  ],
  animationSelector: '[class*="swup-"]',
  containers: ['#layout-main'],
  animateHistoryBrowsing: true,
});

declare global {
  interface Window {
    swup: Swup;
  }
}

export {};
