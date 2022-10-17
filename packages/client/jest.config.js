import dotenv from 'dotenv';

dotenv.config();

export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  automock: false,
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '.+\\.(css|less|sass|scss|png|svg|jpg|ttf|woff|woff2)$':
      'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup-tests.ts'],
};
