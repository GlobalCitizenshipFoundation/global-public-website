import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  // 1) Ignory - NIE ignoruj eslint.config.mjs
  {
    ignores: [
      ".next/**",
      "out/**",
      "dist/**",
      "node_modules/**",
      ".turbo/**",
      ".cache/**",
      // ignoruj konkretne configi, a nie wszystko "*config*"
      "next.config.*",
      "tailwind.config.*",
      "postcss.config.*",
      "stylelint.config.*",
      "prettier.config.*",
    ],
  },

  // 2) Krytyczne: spraw, żeby plugin Next był wykrywalny dla eslint.config.mjs
  {
    files: ["eslint.config.{js,mjs,cjs,ts}"],
    plugins: { "@next/next": nextPlugin },
  },

  // 3) Bazowe
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 4) App code
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      "@next/next": nextPlugin,
      "react-hooks": reactHooks,
    },
    settings: {
      // monorepo: wskaż gdzie jest Next app (u Ciebie to root workspace @gcf/web)
      next: { rootDir: "." },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...reactHooks.configs.recommended.rules,

      "no-undef": "off",

      // WYŁĄCZ te dwie, bo Ci blokują normalne patterny SSR/refs:
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",
    },
  },

  // 5) d.ts
  {
    files: ["**/*.d.ts"],
    rules: { "@typescript-eslint/triple-slash-reference": "off" },
  },
];
