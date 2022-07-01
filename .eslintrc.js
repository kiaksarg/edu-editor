module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
    }, // to enable features such as async/await
    ignorePatterns: ['node_modules/*', '.next/*', '.out/*', '!.prettierrc.js'], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
    extends: ['eslint:recommended'],
    overrides: [
        // This configuration will apply only to TypeScript files
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            settings: { react: { version: 'detect' } },
            env: {
                browser: true,
                node: true,
                es6: true,
            },
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended', // TypeScript rules
                'plugin:react/recommended', // React rules
                'plugin:react-hooks/recommended', // React hooks rules
                'plugin:jsx-a11y/recommended', // Accessibility rules
                'plugin:prettier/recommended', // Prettier plugin
            ],
            rules: {
                'react/prop-types': 'off',
                'react/react-in-jsx-scope': 'off',
                'jsx-a11y/anchor-is-valid': 'off',
                '@typescript-eslint/no-unused-vars': 'off',
                '@typescript-eslint/ban-types': 'off',

                'import/no-internal-modules': 'off',
                'import/no-named-as-default': 'off',
                'import/order': 'off',
                'import/prefer-default-export': 'off',
                'no-nested-ternary': 'off',
                'react/jsx-one-expression-per-line': 'off',
                'react/jsx-props-no-spreading': 'off',
                'react/jsx-wrap-multilines': 'off',
                'sort-imports': 'off',
                'no-underscore-dangle': 'off',
                'react/state-in-constructor': 'off',
                'react/static-property-placement': 'off',
                'sort-keys': 'off',
                'no-prototype-builtins': 'off',
                'no-shadow': 'off',
                'jsx-a11y/click-events-have-key-events': 'off',
                'consistent-return': 'off',
                'react/no-this-in-sfc': 'off',
                'array-callback-return': 'off',
                'no-plusplus': 'off',
                'react/no-did-update-set-state': 'off',
                'jsx-a11y/no-static-element-interactions': 'off',
                'react/destructuring-assignment': 'off',
                'react/button-has-type': 'off',
                '@typescript-eslint/no-use-before-define': 'off',
                'no-useless-escape': 'off',
                'jsx-a11y/no-noninteractive-element-interactions': 'off',
                'react/no-array-index-key': 'off',
                'no-param-reassign': 'off',
                'no-empty-pattern': 'off',
                'no-restricted-globals': 'off',
                // disable the rule for all files
                '@typescript-eslint/explicit-module-boundary-types': 'off',

                'prettier/prettier': [
                    'error',
                    { endOfLine: 'auto' },
                    { usePrettierrc: true },
                ], // Includes .prettierrc.js rules

                // I suggest this setting for requiring return types on functions only where useful
                // '@typescript-eslint/explicit-function-return-type': [
                //     'warn',
                //     {
                //         allowExpressions: true,
                //         allowConciseArrowFunctionExpressionsStartingWithVoid: true,
                //     },
                // ],
            },
        },
    ],
}
