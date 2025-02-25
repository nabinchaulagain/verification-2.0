import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import eslintParserTs from "@typescript-eslint/parser";

export default [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: eslintParserTs,
    },
    plugins: {
      "@typescript-eslint": eslintPluginTs,
    },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "error",
    },
   files: ["**/*.ts"],
  },
];
