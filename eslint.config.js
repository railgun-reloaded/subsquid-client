module.exports = [
  ...require('@railgun-reloaded/eslint-config')(),
  {
    ignores: [
      './src/generated/**/*',
      'eslint.config.js'
    ]
  },
]
