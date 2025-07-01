export default {
  testEnvironment: 'jsdom',
  testMatch: ['**/*.{test,spec}.js'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  setupFiles: ['<rootDir>/setup-test-env.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  reporters: ['default', ['github-actions', { silent: false }], 'summary'],
  coverageDirectory: 'public/coverage',
  // collectCoverageFrom: ['**/src/[jt]s?(x), "!**/*.test.[jt]s?(x)", "!**/node_modules/**/*.[jt]s?(x)"],'],
  collectCoverageFrom: ['src/**/*.{js,ts,jsx,tsx}', '!src/**/*.test.{js,ts,jsx,tsx}', '!node_modules/**'],
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  coverageThreshold: {
    global: {
      lines: 70,
    },
  },
};
