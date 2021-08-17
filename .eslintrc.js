module.exports = {
    extends: ['airbnb-typescript'],
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        quotes: [2, "single", { "avoidEscape": true }],
        "import/prefer-default-export": "off"
    }
};
