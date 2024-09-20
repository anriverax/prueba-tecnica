const baseConfig = require("./eslint-config/base.lint.js");
const tsConfig = require("./eslint-config/typescript.lint.js");
const reactConfig = require("./eslint-config/react.lint.js");
const nextPlugin = require("@next/eslint-plugin-next");

module.exports = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["node_modules/**", "build/**", "dist/**", ".next/**", "eslint-config/**"],
    ...baseConfig,
    ...tsConfig,
    ...reactConfig,
    plugins: {
      ...baseConfig.plugins,
      ...tsConfig.plugins,
      ...reactConfig.plugins,
      "@next/next": nextPlugin
    },
    rules: {
      ...baseConfig.rules,
      ...tsConfig.rules,
      ...reactConfig.rules,
      ...nextPlugin.configs.recommended.rules,
      // TypeError: context.getAncestors is not a function
      "@next/next/no-duplicate-head": "off"
    }
  }
];
