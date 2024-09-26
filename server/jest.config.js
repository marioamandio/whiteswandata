export default {
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
};
