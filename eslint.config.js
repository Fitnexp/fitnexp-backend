// @ts-check

const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
    { ignores: ['*.js', 'dist'] },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
);
