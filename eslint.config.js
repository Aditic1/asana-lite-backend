import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default [
  // MAIN RULESET (for all TS files)
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
    },
    rules: {
      /* ================= CORE SAFETY ================= */
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',

      /* ================= PROMISE & ASYNC ================= */
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/await-thenable': 'error',

      /* ================= CODE QUALITY ================= */
      'no-console': 'error',
      'no-debugger': 'error',
      'no-implicit-coercion': 'error',
      'no-return-await': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',

      /* ================= IMPORT ORDER ================= */
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      /* ================= STRICTNESS ================= */
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'error',

      /* ================= FUNCTIONAL SAFETY ================= */
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',

      /* ================= STYLE ================= */
      'import/newline-after-import': 'error',
    },
  },

  // LOGGER OVERRIDE (allow console only here)
  {
    files: ['src/common/utils/logger.ts'],
    rules: {
      'no-console': 'off',
    },
  },

  // IGNORE FILES
  {
    ignores: ['node_modules/**', 'dist/**', 'src/generated/**'],
  },
];
