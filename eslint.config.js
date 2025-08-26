// eslint.config.js (CJS)
const js = require("@eslint/js");
const globals = require("globals");
const pluginN = require("eslint-plugin-n");
const pluginSecurity = require("eslint-plugin-security");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
  { ignores: ["node_modules/**", "dist/**", "build/**", ".next/**"] },

  // Backend (Node)
  {
    files: ["backend/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs",
      globals: {
        ...globals.node, // defines process, require, __dirname, etc.
      },
    },
    plugins: {
      n: pluginN,
      security: pluginSecurity,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginN.configs["flat/recommended"].rules,
      ...pluginSecurity.configs.recommended.rules,
      ...prettierConfig.rules,

      "no-unused-vars": ["warn"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
      "security/detect-object-injection": "off",
    },
  },

  // Frontend (browser)
  {
    files: ["frontend/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        process: "readonly", // CRA/Vite injects process.env at build time
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,
    },
  },
];
