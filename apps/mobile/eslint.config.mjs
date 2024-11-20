import reactNativeConfig from '@playnest/eslint-config/react-native';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...reactNativeConfig,
  { ignores: ['dist/*', 'node_modules/*', '.turbo/*', '.expo/*'] },
  {
    languageOptions: {
      parserOptions: { project: './tsconfig.json' }
    }
  }
];
