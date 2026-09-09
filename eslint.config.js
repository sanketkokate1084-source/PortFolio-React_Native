const expo = require('eslint-config-expo/flat');
const react = require('eslint-plugin-react');
module.exports = [
  ...expo,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
    },
    rules: {
      'react/jsx-filename-extension': [1, {'extensions': ['.js', '.jsx', '.ts', '.tsx']}],
      'indent': ['error', 2, {'SwitchCase': 1}],
      'linebreak-style': 0,
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'react/jsx-tag-spacing': ['error', {
        'closingSlash': 'never',
        'beforeSelfClosing': 'always',
        'afterOpening': 'never',
        'beforeClosing': 'never',
      }],
      'arrow-parens': ['error', 'as-needed'],
      'object-curly-spacing': ['error', 'never'],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-wrap-multilines': ['error', {
        'declaration': 'parens-new-line',
        'assignment': 'parens-new-line',
        'return': 'parens-new-line',
        'arrow': 'parens-new-line',
        'condition': 'parens-new-line',
        'logical': 'parens-new-line',
        'prop': 'parens-new-line',
      }],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', {'before': false, 'after': true}],
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', {'max': 1, 'maxEOF': 0}],
      'sort-imports': ['error', {
        'ignoreCase': false,
        'ignoreDeclarationSort': true,
        'ignoreMemberSort': false,
        'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
        'allowSeparatedGroups': false,
      }],
      'curly': 'error',
      'no-unused-vars': ['warn', {'args': 'none'}],
      'jsx-quotes': ['error', 'prefer-single'],
      'react/jsx-curly-brace-presence': ['error', {props: 'always', 'propElementValues': 'always'}],
    },
  },
];
