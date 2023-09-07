module.exports = {
    extends: ["react-app", "react-app/jest", "eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    root: true,
    ignorePatterns: ["public/", "build/", "src/ui"],
    rules: {
        "@typescript-eslint/no-unused-vars": "error",
        "react/no-unused-prop-types": 2
    }
};