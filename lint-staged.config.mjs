export default {
  'apps/web/**/*.{js,jsx,ts,tsx,mjs,cjs}': ['npm -w @gcf/web run lint:fix'],
  'apps/cms/**/*.{js,jsx,ts,tsx,mjs,cjs}': ['npm -w @gcf/cms run lint:fix'],
  'packages/**/*.{js,jsx,ts,tsx,mjs,cjs}': ['npm -w @gcf/types run lint:fix'],
  '*.{json,md,yml,yaml,css,scss}': ['prettier --write'],
};
