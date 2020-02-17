import { configure, addDecorator, addParameters } from "@storybook/react";
import { withOptions } from "@storybook/addon-options";
import { withKnobs } from "@storybook/addon-knobs";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withThemes } from "storybook-styled-components";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";

import { OutLineDecorator } from "./OutlineDecorator";
// themes
import { defaultTheme } from "../src/@next/globalStyles";

const themes = {
  Default: defaultTheme,
};

withOptions({
  name: "Saleor",
  url: "https://github.com/mirumee/saleor-storefront",
  goFullScreen: false,
  sidebarAnimations: true,
});
addParameters({ viewport: { viewports: INITIAL_VIEWPORTS } });
addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});
addDecorator(withKnobs);
addDecorator(OutLineDecorator);
addDecorator(withThemes(themes));

const req = require.context(
  "../src/@next/components",
  true,
  /stories\.(tsx|mdx)$/
);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
