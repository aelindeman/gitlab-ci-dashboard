module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  testEnvironment: "jsdom",
  testRegex: "test/.*\\.test\\.([tj]sx?)$",
};
