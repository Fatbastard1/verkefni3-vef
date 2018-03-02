module.exports = {
  extends: 'airbnb-base',
  extends: 'airbnb',
  env: {
    node: true,
    mocha: true,
  },
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'linebreak-style': 0,
  }
};
