module.exports = {
  testEnvironment: "jsdom",
  testRegex: "/.*\\.test\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/test/mocks/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/src/test/mocks/styleMock.js",
  },
  modulePaths: ["<rootDir>/src"],
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "clover", "cobertura"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/index.tsx",
    "!src/**/test/**",
  ],
};
