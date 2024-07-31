import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    extends: [
      'eslint:recommended',
      'next',
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
    globals: {
      React: true,
      JSX: true,
    },
  },
];
