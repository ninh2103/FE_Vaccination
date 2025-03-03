module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime' // Nếu dùng React 17+
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect' // Tự động phát hiện phiên bản React
    }
  },
  plugins: ['react'],
  rules: {
    'react/jsx-no-target-blank': 'warn'
  }
}
