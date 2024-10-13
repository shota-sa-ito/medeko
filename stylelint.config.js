/**
 * @type {import('stylelint').Config}
 */
export default {
  defaultSeverity: 'warning',

  ignoreFiles: [
    // Build output
    '**/dist/**',

    // Astro artifacts
    '**/.astro/**',

    // Dependencies
    '**/node_modules/**',

    // Logs
    '*.log*',

    // Style extends,
    '**/!(*.{css,astro})',
  ],

  extends: [
    /**
     * @npm {@link https://www.npmjs.com/package/stylelint-config-recess-order}
     */
    'stylelint-config-recess-order',

    /**
     * @npm {@link https://www.npmjs.com/package/stylelint-config-html}
     */
    'stylelint-config-html',
  ],

  rules: {
    'value-keyword-case': ['lower', { camelCaseSvgKeywords: true }],
  },
};
