export default {
  presets: [
    "@babel/preset-env",   // for modern JavaScript
    "@babel/preset-react"  // for React JSX syntax
  ],
  plugins: [
    "@babel/plugin-transform-runtime" // Optional, for optimizations
  ]
};

