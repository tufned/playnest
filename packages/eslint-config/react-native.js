import tseslint from 'typescript-eslint';
import globals from 'globals';
import baseConfig from '@playnest/eslint-config/base';
import reactHooks from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';
import reactNativePlugin from 'eslint-plugin-react-native';
import reactRules from './react-rules.js';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  ...baseConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react': reactPlugin,
      'react-native': reactNativePlugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactRules,

      // React Native rules
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'error',
      'react-native/no-inline-styles': 'error',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': ['error', {
        skip: ['Text']
      }],
      'react-native/no-single-element-style-arrays': 'error'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
);
