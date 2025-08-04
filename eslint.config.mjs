// eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";
import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends(
    "plugin:@next/next/recommended", // Use this instead of "next/core-web-vitals" in flat config
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended" // If using TS
  ),

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
  },

  {
    rules: {
      // Optional: tweak rules
      "@next/next/no-img-element": "off",
    },
  },
];
