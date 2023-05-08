module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  plugins: [
      "@typescript-eslint",
      "prettier"
  ],
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ["./tsconfig.json"]
  },
  rules: {

  }
}

