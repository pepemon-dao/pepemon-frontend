module.exports = {
    env: {
        browser: true,
        node: true,
    },
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "prettier",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        project: "tsconfig.eslint.json",
        tsconfigRootDir: __dirname,
        sourceType: "module", // Allows for the use of imports
    },
    plugins: ["@typescript-eslint", "@typescript-eslint/tslint", "import", "unused-imports"],

    rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars-experimental": "error",
        "no-unused-vars": "off",
        "import/order": "error",
        "no-console": ["warn", { allow: ["warn", "error"] }],
        eqeqeq: ["error", "always"],
        "no-else-return": "error",
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                moduleDirectory: ["node_modules", "src/"],
            },
        },
    },
};