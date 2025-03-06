// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Create this file next
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy', // Mock CSS imports
    },
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
  };