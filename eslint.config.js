import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import parser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    // Lint all JavaScript, TypeScript, JSX, and TSX files
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser, // Use TypeScript parser
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2021,
        sourceType: "module",
      },
      globals: globals.browser, // Define browser globals (window, document, etc.)
    },
  },
  // JavaScript recommended rules
  pluginJs.configs.recommended,
  // TypeScript recommended rules
  ...tseslint.configs.recommended,
  // React recommended rules
  pluginReact.configs.flat.recommended,
  {
    // Custom settings and rules
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all", // Check all declared variables
          args: "after-used", // Check unused function arguments
          ignoreRestSiblings: true, // Allow rest siblings in destructuring
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn", // Warn on 'any' usage
      "react/react-in-jsx-scope": "off", // Disable for React 17+ JSX runtime
      "react/prop-types": "off", // Disable PropTypes checks with TypeScript
    },
  },
];
