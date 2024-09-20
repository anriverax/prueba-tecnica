const tsConfig = require("./typescript.lint");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");

const reactConfig = {
  ...tsConfig,
  plugins: {
    ...tsConfig.plugins,
    react: reactPlugin,
    "react-hooks": reactHooksPlugin
  },
  rules: {
    ...tsConfig.rules,
    ...reactPlugin.configs.recommended.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    "react/no-deprecated": "warn",
    "react/jsx-boolean-value": "error",
    "react/jsx-child-element-spacing": "error",
    "react/jsx-curly-brace-presence": "error",
    "react/state-in-constructor": ["error", "always"],
    "react/jsx-closing-bracket-location": ["error", "line-aligned"],
    "react/jsx-curly-spacing": ["error", { when: "never", children: true }],
    "react/jsx-equals-spacing": ["error", "never"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
    "react/jsx-max-props-per-line": ["error", { when: "multiline" }],
    "react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }]
  },
  settings: {
    ...tsConfig.settings,
    react: {
      version: "detect"
    }
  }
};

module.exports = reactConfig;
