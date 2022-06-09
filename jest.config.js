const jestConfig = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.ts"],
};

export default jestConfig;
