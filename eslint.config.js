module.exports = [
  {
    ignores: [
      '**/src/generated/**/*.ts',
    ]
  },
  ...require('@railgun-reloaded/eslint-config')(),
]
