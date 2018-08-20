import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'Saleor',
  url: 'https://github.com/mirumee/saleor-storefront',
  goFullScreen: false,
  sidebarAnimations: true,
});

function loadStories() {
  require('./stories/button.js');
};

configure(loadStories, module);
