import { configure, addDecorator, addParameters } from "@storybook/react";
import { withOptions } from "@storybook/addon-options";
import { withKnobs } from "@storybook/addon-knobs";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withThemesProvider } from "storybook-addon-styled-component-theme";

import { OutLineDecorator } from "./OutlineDecorator";

// themes
import { defaultTheme } from "../src/globalStyles";
const themes = [defaultTheme];

withOptions({
  name: "Saleor",
  url: "https://github.com/mirumee/saleor-storefront",
  goFullScreen: false,
  sidebarAnimations: true
});
addParameters({ viewport: { viewports: INITIAL_VIEWPORTS } });
addDecorator(withKnobs);
addDecorator(OutLineDecorator);
addDecorator(withThemesProvider(themes));

const req = require.context("../src/@components", true, /stories\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
