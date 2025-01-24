import type { Config } from 'jest';

const config: Config = {
testEnvironment: 'jsdom',
setupFilesAfterEnv: ['@testing-library/jest-dom'],
testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
],
moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
},
moduleDirectories: ['node_modules'],
testPathIgnorePatterns: ['/node_modules/', '/.next/'],
transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }]
},
collectCoverage: true,
coverageDirectory: "coverage",
coveragePathIgnorePatterns: [
    "/node_modules/",
    "/.next/"
]
};

export default config;

