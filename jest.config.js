module.exports = {
  testEnvironment: "jsdom",
  testRegex: "/.*\\.test.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterSetup: ["<rootDir>/src/setupTests.ts"],
  collectCoverage: true,
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/test/mocks/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/src/test/mocks/styleMock.js",
  },
};
