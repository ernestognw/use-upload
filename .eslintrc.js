module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'import/no-unresolved': 0,
    'react/react-in-jsx-scope': 0,
    'import/no-extraneous-dependencies': 0,
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'import/prefer-default-export': 0,
    'no-use-before-define': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
    'jsx-a11y/mouse-events-have-key-events': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/interactive-supports-focus': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['route'],
      },
    ],
  },
};
