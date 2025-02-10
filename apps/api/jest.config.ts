/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "@playnest/utils": "<rootDir>/../packages/utils/src"
  },
  transform: {
    "^.+.tsx?$": [
      "ts-jest",
      {
        useESM: true
      }
    ]
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testRegex: "src/.*\\.(spec|test)\\.(ts|js)$"
};

export default config;
