export default {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  reporters: ['default', ['github-actions', { silent: false }], 'summary'],
  collectCoverage: true,
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
