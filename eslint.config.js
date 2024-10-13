import eslint from '@eslint/js';
import tslintParser from '@typescript-eslint/parser';
import astroPlugin from 'eslint-plugin-astro'; // @ts-expect-error: Unsupported type
import importPlugin from 'eslint-plugin-import'; // @ts-expect-error: Unsupported type
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import eslintPluginSolid from 'eslint-plugin-solid/configs/typescript';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 除外設定
  {
    ignores: [
      // Build output
      '**/dist',

      // Astro artifacts
      '**/.astro',

      // Dependencies
      '**/node_modules',

      // Logs
      '*.log*',
    ],
  },

  // 基礎
  eslint.configs.recommended,
  {
    plugins: {
      import: importPlugin,
      perfectionist: perfectionistPlugin,
    },
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unused-vars': 'warn',
      'import/no-unresolved': 'off',
      'import/namespace': 'off',
      'import/named': 'off',
      'perfectionist/sort-imports': [
        'warn',
        {
          type: 'natural',
          internalPattern: ['@/**'],
          newlinesBetween: 'never',
        },
      ],
      'perfectionist/sort-exports': [
        'error',
        {
          type: 'natural',
        },
      ],
      'perfectionist/sort-named-imports': [
        'warn',
        {
          type: 'natural',
          groupKind: 'values-first',
        },
      ],
      'perfectionist/sort-named-exports': [
        'warn',
        {
          type: 'natural',
          groupKind: 'values-first',
        },
      ],
    },
  },

  // CommonJS
  {
    files: ['**/*.{cjs,cts}'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },

  // TypeScript ... TypeScript の設定をベースに考えたいので `files` は指定しない
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parser: tslintParser,
      parserOptions: {
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    settings: {
      'import/resolver': { typescript: true },
    },
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: true,
        },
      ],
      'import/consistent-type-specifier-style': ['warn', 'prefer-top-level'],
    },
  },

  // TypeScript
  {
    files: ['**/*.d.{ts,cts,mts}'],
    rules: {
      'no-var': 'off',
    },
  },

  // JSX・TSX・Astro
  .../**
   * @type {import('typescript-eslint').ConfigWithExtends[]}
   */ (
    ((files = ['**/*.{jsx,tsx}', '**/*.astro', '**/*.astro/*.js']) => [
      { files, ...jsxA11yPlugin.flatConfigs.recommended },
      {
        files,
        rules: {
          'jsx-a11y/control-has-associated-label': 'error',
        },
      },
    ])()
  ),

  // JSX・TSX
  .../**
   * @type {import('typescript-eslint').ConfigWithExtends[]}
   */ (
    ((files = ['**/*.{jsx,tsx}']) => [
      { files, ...eslintPluginSolid },
      {
        files,
        rules: {
          a: 'aa',
        },
      },
    ])()
  ),

  // Astro ... Astro の Recommended 設定内で `.astro` 以外のファイルは除外されているので `files` は指定しない
  ...astroPlugin.configs.recommended,
  {
    files: ['**/*.astro', '**/*.astro/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
);
