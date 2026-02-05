import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        browser: true,
        node: true,
        process: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
        node: true,
        process: true,
      },
    },
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    ignores: [
      'node_modules',
      'dist',
      'backend',
      '.eslintrc.js',
      '.stylelintrc.js',
      'postcss.config.js',
      'tailwind.config.js',
      'commitlint.config.js',
      'vite.config.ts',
      'tsconfig*.json',
      '*.d.ts',
    ],
  },
];
