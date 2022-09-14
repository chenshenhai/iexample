/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    'plugin:prettier/recommended'
  ],
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/no-setup-props-destructure': 'warn',
    'no-prototype-builtins': 'off',
    quotes: ['error', 'single']
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
};
