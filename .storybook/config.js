import { configure, addDecorator, addParameters } from "@storybook/react";
import { withOptions } from "@storybook/addon-options";
import { withKnobs } from "@storybook/addon-knobs";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import StylesDecorator from "./StylesDecorator";

withOptions({
  name: "Saleor",
  url: "https://github.com/mirumee/saleor-storefront",
  goFullScreen: false,
  sidebarAnimations: true
});
addParameters({ viewport: { viewports: INITIAL_VIEWPORTS } });
addDecorator(withKnobs);
addDecorator(StylesDecorator);

const req = require.context("../src/@components", true, /stories\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
