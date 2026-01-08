export default {
  'apps/web/**/*.{js,jsx,ts,tsx,mjs,cjs}': () => 'npm --workspace @gcf/web run lint:fix',
  'apps/cms/**/*.{js,jsx,ts,tsx,mjs,cjs}': () => 'npm --workspace @gcf/cms run lint:fix',
  '*.{json,md,yml,yaml,css,scss}': 'prettier --write',
};
