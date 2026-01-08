module.exports = {
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: ['.next/**', 'node_modules/**', 'dist/**', 'out/**', 'coverage/**'],
  rules: {
    'color-hex-length': 'short',
    'block-no-empty': true,
    'declaration-no-important': true,

    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'layer', 'variants', 'responsive', 'screen'],
      },
    ],
  },
};
