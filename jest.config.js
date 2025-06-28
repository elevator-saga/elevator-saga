export default {
  testEnvironment: 'jsdom',
  // roots: ['<rootDir>/test'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
