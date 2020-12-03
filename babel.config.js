module.exports = api => {
  const isExtract = api.env("extract");
  const isTest = api.env("test");
  const isStorybook = api.env("storybook");

  const ignore =
    isTest || isStorybook
      ? []
      : ["**/*.test.ts", "**/*.test.tsx", "src/storybook"];
  const presets = [
    "@babel/preset-env",
    "@babel/preset-react",
    [
      "@babel/preset-typescript",
      {
        allowNamespaces: true,
      },
    ],
  ];
  const plugins = [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-typescript",
    "babel-plugin-styled-components",
    "transform-class-properties",
    "@babel/transform-runtime",
    "@babel/plugin-proposal-optional-chaining",
    [
      "react-intl-auto",
      {
        filebase: true,
        includeExportName: "all",
        removePrefix: "src/",
      },
    ],
  ];
  if (isExtract) {
    plugins.push([
      "react-intl",
      {
        extractFromFormatMessageCall: true,
        messagesDir: "dist/locale/",
      },
    ]);
  }
  if (isStorybook) {
    plugins.push("babel-plugin-styled-components");
  }

  plugins.push("macros");

  return {
    ignore,
    plugins,
    presets,
  };
};
