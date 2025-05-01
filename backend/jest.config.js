module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'], // Match test files
  moduleFileExtensions: ['ts', 'js'], // Recognize TypeScript and JavaScript files
  transform: {
    '^.+\\.ts$': 'ts-jest', // Use ts-jest to transform TypeScript files
  },
};
