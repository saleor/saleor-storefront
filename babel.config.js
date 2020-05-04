module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "transform-class-properties",
    "@babel/transform-runtime",
    "@babel/plugin-proposal-optional-chaining",
  ],
};
