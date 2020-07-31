module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.spec.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  preset: "@shelf/jest-mongodb"
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
