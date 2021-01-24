const { defaults } = require("jest-config");

module.exports = {
  name: "next-aws-lambda-webpack-plugin",
  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, "/example"],
  testMatch: [...defaults.testMatch, "**/tests/**/*.[jt]s?(x)"],
  testTimeout: 10000,
};
