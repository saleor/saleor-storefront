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

  plugins.push("macros");

  return {
    ignore,
    plugins,
    presets,
  };
};
