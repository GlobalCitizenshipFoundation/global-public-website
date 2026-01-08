import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import next from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // ignore config/build artifacts etc.
  {
    ignores: [
      '.next/**',
      'out/**',
      'dist/**',
      'node_modules/**',
      '**/*.config.*',
      'stylelint.config.cjs',
    ],
  },

  // base JS
  js.configs.recommended,

  // TS recommended (parser + rules, non type-aware)
  ...tseslint.configs.recommended,

  // app code rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@next/next': next,
      'react-hooks': reactHooks,
    },
    rules: {
      ...next.configs['core-web-vitals'].rules,
      ...reactHooks.configs.recommended.rules,

      // TS handles undefined vars
      'no-undef': 'off',
    },
  },

  // allow next-env.d.ts triple slash references
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
];
