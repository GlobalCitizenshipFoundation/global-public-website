export default {
  "*.{js,jsx,ts,tsx,json,css,scss,md,yml,yaml}": ["pnpm -w exec biome format --write"],
  "apps/web/**/*.{js,jsx,ts,tsx}": ["pnpm -C apps/web lint:staged"],
  "apps/web/src/**/*.{css,scss}": ["pnpm -C apps/web exec stylelint --fix --allow-empty-input"],
  "apps/cms/**/*.{js,jsx,ts,tsx}": ["pnpm -C apps/cms lint:staged"],
};
