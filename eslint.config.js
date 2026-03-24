// @ts-check
const eslint = require("@eslint/js");
const angular = require("angular-eslint");

module.exports = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      ...eslint.configs.recommended.rules,
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    rules: {
      "@angular-eslint/template/no-negated-async": "error",
      "@angular-eslint/template/banana-in-box": "error",
      "@angular-eslint/template/no-any": "warn",
    },
  }
];
