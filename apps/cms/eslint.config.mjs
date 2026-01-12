import studio from '@sanity/eslint-config-studio';
import globals from 'globals';

export default [
  // nie lintuj buildów i configów
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.sanity/**',
      '.next/**',
      'postcss.config.js',
    ],
  },

  // sanity studio rules
  ...studio,

  // pliki node/config: module/require/process mają istnieć
  {
    files: ['**/*.{js,cjs,mjs}', 'postcss.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
];
