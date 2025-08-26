// backend/eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import pluginN from "eslint-plugin-n";
import pluginSecurity from "eslint-plugin-security";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["node_modules/**", "dist/**", "build/**", ".next/**"] },
  {
    files: ["**/*.js"],          
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",     
      globals: {
        ...globals.node,         // defines process, require (as a global ref), __dirname, etc.
      },
      parserOptions: {
        ecmaVersion: "latest",
      },
    },
    plugins: {
      n: pluginN,
      security: pluginSecurity,
    },
    rules: {
      // Base recommendations
      ...js.configs.recommended.rules,

      // Node + security recommendations (flat config presets)
      ...pluginN.configs["flat/recommended"].rules,
      ...pluginSecurity.configs.recommended.rules,

      // Disable stylistic rules that conflict with Prettier
      ...prettier.rules,

      "no-unused-vars": ["warn"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
      "security/detect-object-injection": "off",
      "n/no-unpublished-import": "off",
    },
  },
];
