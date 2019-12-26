module.exports = {
    extends: [
      "react-app",
      "plugin:prettier/recommended",
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: `./tsconfig.json`,
    },
};
  