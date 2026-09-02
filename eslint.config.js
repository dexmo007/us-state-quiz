import css from '@eslint/css';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/jsx-fragments': 'warn',
    },
  },
  { files: ['**/*.{jsx,tsx}'], ...pluginReact.configs.flat['jsx-runtime'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
    rules: {
      'import/no-relative-parent-imports': [
        'warn',
        {
          ignore: ['~/'],
        },
      ],
    },
  },
  { settings: { react: { version: '19' } } },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
  eslintConfigPrettier,
]);
