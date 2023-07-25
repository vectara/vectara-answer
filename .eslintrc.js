module.exports = {
    extends: ["react-app", "react-app/jest", "eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    root: true,
    ignorePatterns: ["src/generated_protos/", "public/", "tailwind.config.js", "build/"],
    rules: {
        "@typescript-eslint/no-unused-vars": "error",
        "react/no-unused-prop-types": 2
    }
};