module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  parser: "@typescript-eslint/parser",
  env: {
    es2020: true,
    node: true,
  },
  rules: {
    "object-curly-spacing": ["error", "always"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    indent: ["error", 2, { SwitchCase: 1, VariableDeclarator: 1 }],
    "no-tabs": 2,
    camelcase: 0,
    "turbo/no-undeclared-env-vars": 0,
    "@typescript-eslint/no-empty-interface": 1,
  },
  root: true,
};
