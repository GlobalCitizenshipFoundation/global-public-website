export default {
  // Biome: tylko pliki, które Biome ogarnia
  "*.{js,jsx,ts,tsx,json,css,scss,md}": ["pnpm -w exec biome format --write"],

  // YAML: nie dotykamy (żeby nie blokować commitów workflowów)
  "*.{yml,yaml}": [],

  // App-specific staged lint
  "apps/web/**/*.{js,jsx,ts,tsx}": ["pnpm -C apps/web lint:staged"],
  "apps/web/src/**/*.{css,scss}": [
    "pnpm -C apps/web exec stylelint --fix --allow-empty-input",
  ],
  "apps/cms/**/*.{js,jsx,ts,tsx}": ["pnpm -C apps/cms lint:staged"],
};
