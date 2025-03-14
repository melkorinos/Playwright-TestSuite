import playwright from 'eslint-plugin-playwright';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
    {
        files: ['**/*.ts'],
        plugins: {
            '@typescript-eslint': typescript,
            'playwright': playwright,
        },
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },

        rules: {
            ...typescript.configs.recommended.rules,
            ...playwright.configs.recommended.rules,
        },
        ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
    },
];
