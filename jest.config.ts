import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testMatch: ["**/__tests__/unit/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/src/$1",
    "^vue$": "vue/dist/vue.common.js",
  },
  moduleFileExtensions: ["ts", "js", "vue", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    ".*\\.(vue)$": "vue-jest",
  },

  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],

  collectCoverage: false,
  collectCoverageFrom: ["<rootDir>/src/modules/**/*.vue", "<rootDir>/src/modules/**/*.ts"],
  testEnvironment: "jsdom",
};

export default config;
