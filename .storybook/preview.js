import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import { OutLineDecorator } from "./OutlineDecorator";

export const parameters = {
  name: "Saleor Storefront",
  url: "https://github.com/mirumee/saleor-storefront",
  goFullScreen: false,
  sidebarAnimations: true, 
  controls: { expanded: true },
  viewport: { viewports: INITIAL_VIEWPORTS },
};

export const decorators = [
  OutLineDecorator,
];

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'fr', right: '🇫🇷', title: 'Français' },
        { value: 'es', right: '🇪🇸', title: 'Español' },
        { value: 'zh', right: '🇨🇳', title: '中文' },
        { value: 'kr', right: '🇰🇷', title: '한국어' },
      ],
    },
  },
};
