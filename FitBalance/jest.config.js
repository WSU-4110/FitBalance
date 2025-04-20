export default {
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass|svg|jpg|png)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom']
  };
  