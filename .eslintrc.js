module.exports = {
    settings: {
        react: {
            version: "detect", // Automatically detect the react version
        },
        // "import/resolver": {
        //     webpack: {
        //         config: "webpack.config.js",
        //     },
        // },
    },
    env: {
        browser: true,
        node: true,
        jest: true,
    },
    plugins: [
        // "@typescript-eslint",
        "simple-import-sort",
        "react-hooks",
        "jest",
        "unicorn",
        "prettier",
    ],
    extends: [
        "airbnb",
        "plugin:react/recommended",
        // "plugin:@typescript-eslint/recommended",
        // "plugin:import/typescript",
        "plugin:jsx-a11y/recommended",
        "prettier",
    ],
    overrides: [
        {
            // For Storybook that REQUIRES default exports for CSF story format
            files: ["src/**/*.stories.js"],
            rules: {
                "import/no-default-export": "off",
            },
        },
    ],
    rules: {
        /* rules of eslint official */
        "no-unused-vars": 0,
        // (you must disable the base rule as it can report incorrect errors)
        "no-use-before-define": "off",
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
            },
        ],
        // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
        "import/prefer-default-export": 0,
        "import/no-default-export": "error",
        "import/no-extraneous-dependencies": [
            "error",
            {
                devDependencies: [
                    "**/__tests__/**",
                    "**/jest.config.js",
                    "**/**/*.stories.*",
                    "**/webpack.*",
                ],
            },
        ],
        // https://eslint.org/docs/rules/no-unused-expressions
        "no-unused-expressions": [
            "warn",
            {
                allowShortCircuit: true,
                allowTernary: true,
            },
        ],
        // "@typescript-eslint/explicit-function-return-type": 0,
        // "@typescript-eslint/explicit-module-boundary-types": 0,
        // "@typescript-eslint/no-empty-function": 0,
        // "@typescript-eslint/no-unused-vars": ["error"],
        // "@typescript-eslint/no-explicit-any": 0,
        // "@typescript-eslint/no-inferrable-types": 0,
        // "@typescript-eslint/no-use-before-define": [
        //     "error",
        //     {
        //         functions: false,
        //         classes: true,
        //         variables: true,
        //         typedefs: true,
        //     },
        // ],

        /* rules of eslint-plugin-react */
        // "react/jsx-filename-extension": [
        //     "warn",
        //     {
        //         extensions: [".jsx", ".tsx"],
        //     },
        // ],
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
        "react/prop-types": "off", // temporary
        "react/display-name": "off",
        /* rules of eslint-plugin-react-hooks */
        "react-hooks/rules-of-hooks": "error",
        "simple-import-sort/imports": [
            "error",
            {
                groups: [
                    // Node.js builtins. You could also generate this regex if you use a `.js` config.
                    // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
                    [
                        "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
                    ],
                    // Packages. `react` related packages come first.
                    // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
                    ["^react", "^@?\\w"],
                    // Internal packages.
                    [
                        "^(@|@company|@ui|pages|containers|components|hooks|utils|types|config|lib|routes|theme|locales|mocks|test_utils|vendored-lib)(/.*|$)",
                    ],
                    // Side effect imports.
                    ["^\\u0000"],
                    // Parent imports. Put `..` last.
                    ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                    // Other relative imports. Put same-folder imports and `.` last.
                    ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                    // Style imports.
                    ["^.+\\.s?css$"],
                ],
            },
        ],
        "simple-import-sort/exports": "error",
        "unicorn/prevent-abbreviations": [
            "error",
            {
                allowList: {
                    // React props
                    props: true,
                    // React propVal
                    propVal: true,
                },
                ignore: [
                    /PropsType$/g, // interface naming
                ],
            },
        ],
        "prettier/prettier": [
            "error",
            {
                singleQuote: false,
                semi: true,
                tabWidth: 4,
                printWidth: 100,
            },
        ],
    },
};
