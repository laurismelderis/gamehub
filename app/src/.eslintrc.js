module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'react-app',
      'react-app/jest',
      'plugin:react/recommended',
      'airbnb',
      'prettier',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: ['react'],
    ignorePatterns: [
      'manifest.json',
      'package.json',
      'package-lock.json',
      'README.md',
    ],
    rules: {
      'react/jsx-props-no-spreading': 0,
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function' },
      ],
      'no-param-reassign': [
        'error',
        { props: true, ignorePropertyModificationsFor: ['state'] },
      ],
      'semi': [2, 'never']
    },
    overrides: [
      {
        files: ['**/*.test.jsx', '**/*.spec.jsx'],
        env: {
          jest: true,
        },
      },
    ],
  }
  