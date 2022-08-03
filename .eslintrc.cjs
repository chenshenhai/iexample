/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  "root": true,
  "plugins": ['prettier'],
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-empty-function": "off",
    "quotes": ["error", "single"]
  }
  // "overrides": [
  //   {
  //     "files": [
  //       "cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}"
  //     ],
  //     "extends": [
  //       "plugin:cypress/recommended"
  //     ]
  //   }
  // ]
}
