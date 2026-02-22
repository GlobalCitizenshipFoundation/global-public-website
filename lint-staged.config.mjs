export default {
  "*.{js,jsx,ts,tsx,mjs,cjs,json,css,scss,md}": ["pnpm -w exec biome format --write"],

  "apps/web/**/*.{js,jsx,ts,tsx}": [
    "pnpm -C apps/web exec eslint --cache --cache-location ../../.cache/eslint/web",
  ],

  "apps/cms/**/*.{js,jsx,ts,tsx,mjs,cjs,json,css,scss,md}": ["pnpm -w exec biome check"],

  "*.{yml,yaml}": [],
};
