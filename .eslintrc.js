module.exports = {
  env: {
    browser: true,
    es6: true
  },
  settings: {
    ecmascript: 6,
    jsx: true,
    'import/core-modules': ['prop-types']
  },
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      experimentalDecorators: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  extends: ['airbnb', 'prettier/react'],
  rules: {
    'react/jsx-filename-extension': 0,
    'arrow-parens': [2, 'as-needed'],
    'function-paren-newline': 0,
    'comma-dangle': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 100
      }
    ]
  }
};
