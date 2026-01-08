import path from "node:path";
import { fileURLToPath } from "node:url";

import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import a11yPlugin from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  {
    ignores: [
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/node_modules/**",
      "**/.turbo/**",
      "**/.vercel/**"
    ]
  },

  js.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      import: importPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": a11yPlugin
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: true,
        node: true
      }
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,

      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ],
      "react/react-in-jsx-scope": "off"
    }
  },

  ...compat
    .extends("next/core-web-vitals")
    .map((cfg) => ({
      ...cfg,
      files: ["apps/web/**/*.{js,jsx,ts,tsx}"]
    })),

  eslintConfigPrettier
];
