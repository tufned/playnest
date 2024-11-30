import nextConfig from '@playnest/eslint-config/next';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...nextConfig,
  { ignores: ['dist/*', 'node_modules/*', '.turbo/*', '.next/*', '*.config.mjs'] },
  {
    languageOptions: {
      parserOptions: { project: './tsconfig.json' }
    }
  }
];
