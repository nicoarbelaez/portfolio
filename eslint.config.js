import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import * as astroParser from 'astro-eslint-parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments';
import globals from 'globals';

const sharedPlugins = {
  'unused-imports': unusedImports,
  '@eslint-community/eslint-comments': eslintComments
};

const sharedRules = {
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  'no-unused-vars': 'off',
  'unused-imports/no-unused-imports': 'warn',
  'unused-imports/no-unused-vars': [
    'warn',
    {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
      caughtErrorsIgnorePattern: '^_'
    }
  ],
  '@eslint-community/eslint-comments/no-unlimited-disable': 'error',
  '@eslint-community/eslint-comments/no-restricted-disable': [
    'error',
    '@typescript-eslint/no-explicit-any'
  ],
  '@eslint-community/eslint-comments/no-unused-disable': 'warn'
};

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      '.astro/**',
      '.vercel/**',
      '.tmp/**',
      'node_modules/**',
      'public/**',
      '*.config.*',
      '.husky/**'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...astro.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: sharedPlugins,
    rules: sharedRules
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro']
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      ...sharedPlugins,
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'unused-imports/no-unused-imports': 'warn',
      '@eslint-community/eslint-comments/no-restricted-disable': [
        'error',
        '@typescript-eslint/no-explicit-any'
      ]
    }
  },
  {
    files: ['**/*.{tsx,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'
    }
  }
);
