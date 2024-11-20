import libraryConfig from '@playnest/eslint-config/node';

export default [
  ...libraryConfig,
  {
    ignores: ['dist/*', 'node_modules/*', '.turbo/*']
  },
  {
    languageOptions: {
      parserOptions: { project: './tsconfig.json' }
    }
  }
];
