module.exports = api => {
  const isExtract = api.env("extract");
  const isTest = api.env("test");
  const isStorybook = api.env("storybook");

  const ignore =
    isTest || isStorybook
      ? []
      : ["**/*.test.ts", "**/*.test.tsx", "src/storybook"];
  const presets = ["next/babel"];
  const plugins = [
    [
      "styled-components",
      {
        ssr: true,
        displayName: true,
      },
    ],
    [
      "react-intl-auto",
      {
        filebase: true,
        includeExportName: "all",
        removePrefix: "src/",
      },
    ],
    isExtract && [
      "react-intl",
      {
        extractFromFormatMessageCall: true,
        messagesDir: "dist/locale/",
      },
    ],
  ].filter(Boolean);

  return {
    ignore,
    plugins,
    presets,
  };
};
