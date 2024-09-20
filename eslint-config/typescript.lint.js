const baseConfig = require("./base.lint");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

const tsConfig = {
  ...baseConfig,
  plugins: {
    ...baseConfig.plugins,
    "@typescript-eslint": tsPlugin
  },
  languageOptions: {
    ...baseConfig.languageOptions,
    parser: tsParser,
    parserOptions: {
      project: ["./tsconfig.json"]
    }
  },
  rules: {
    ...baseConfig.rules,
    ...tsPlugin.configs["recommended"].rules,
    ...tsPlugin.configs["recommended-requiring-type-checking"].rules,
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: false }],
    "@typescript-eslint/no-invalid-this": ["error"],
    "@typescript-eslint/no-use-before-define": ["error"],
    semi: ["error", "always"],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false
      }
    ]
  },
  settings: {
    ...baseConfig.settings,
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {}
    }
  }
};

module.exports = tsConfig;
