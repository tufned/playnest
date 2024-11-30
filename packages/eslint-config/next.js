import tseslint from 'typescript-eslint';
import globals from 'globals';
import baseConfig from '@playnest/eslint-config/base';
import reactHooks from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';
import nextPlugin from '@next/eslint-plugin-next';
import reactRules from './react-rules.js';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  ...baseConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...nextPlugin.configs.recommended.globals
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react': reactPlugin,
      '@next/next': nextPlugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactRules,

      // Next.js rules
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error',
      '@next/next/no-head-element': 'error',
      '@next/next/no-unwanted-polyfillio': 'warn',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-document-import-in-page': 'error',
      '@next/next/no-title-in-document-head': 'error',
      '@next/next/google-font-display': 'error',
      '@next/next/no-page-custom-font': 'error'
    },
    settings: {
      react: {
        version: 'detect'
      },
      next: {
        rootDir: '.'
      }
    }
  }
);
