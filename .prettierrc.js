'use strict';

module.exports = {
    overrides: [
        {
            files: '*.js',
            options: {
                singleQuote: true,
                printWidth: 80,
                tabWidth: 4
            }
        },
        {
            files: '*.hbs',
            options: {
                singleQuote: false,
                printWidth: 120,
                tabWidth: 4
            }
        },
        {
            files: '*.json',
            options: {
                tabWidth: 4
            }
        }
    ]
};
