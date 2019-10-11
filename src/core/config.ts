import { generatePageUrl } from "./utils";

export const BASE_URL = "/";
export const PRODUCTS_PER_PAGE = 8;
export const SUPPORT_EMAIL = "support@example.com";
export const PROVIDERS = {
  BRAINTREE: "Braintree",
  DUMMY: "Dummy",
};
export const STATIC_PAGES = [
  {
    label: "About",
    url: generatePageUrl("about"),
  },
];
export const SOCIAL_MEDIA = [
  {
    ariaLabel: "facebook",
    href: "http://facebook.com/collaboapp",
    path: require("../images/facebook-icon.svg"),
  },
  {
    ariaLabel: "twitter",
    href: "https://twitter.com/collabohq",
    path: require("../images/twitter-icon.svg"),
  },
];
export const META_DEFAULTS = {
  custom: [],
  description: "PWA Storefront",

  image: `${window.location.origin}${require("../images/logo.svg")}`,
  title: "Saleor",
  type: "website",
  url: window.location.origin,
};
