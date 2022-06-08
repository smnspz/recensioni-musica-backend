const jestConfig = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./test/data/setup/singleton.ts"],
  testMatch: ["**/test/**/*.test.ts"],
};

export default jestConfig;
