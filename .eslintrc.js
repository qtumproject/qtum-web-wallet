module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'quotes': [2, 'single'],
        'semi': [2, 'never'],
        'comma-dangle': [2, 'never'],
        'eol-last': 2
    }
}
