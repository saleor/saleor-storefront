import { generatePageUrl } from "./utils";

export const BASE_URL = "/";
export const PRODUCTS_PER_PAGE = 12;
export const SUPPORT_EMAIL = "support@example.com";
export const PROVIDERS = {
  BRAINTREE: "Braintree",
  DUMMY: "Dummy",
  STRIPE: "Stripe",
};
export const STATIC_PAGES = [
  {
    label: "About",
    url: generatePageUrl("about"),
  },
];
export const SOCIAL_MEDIA = [
  {
    ariaLabel: "instagram",
    href: "https://www.instagram.com/storitalia/",
    path: require("../images/instagram-icon.svg"),
  },
  {
    ariaLabel: "twitter",
    href: "https://www.twitter.com/storitalia/",
    path: require("../images/twitter-icon.svg"),
  },
  {
    ariaLabel: "pinterest",
    href: "https://www.pinterest.com/storitalia/",
    path: require("../images/pinterest-icon.svg"),
  },
  {
    ariaLabel: "vimeo",
    href: "https://vimeo.com/storitalia",
    path: require("../images/vimeo-icon.svg"),
  },
];
export const META_DEFAULTS = {
  custom: [],
  description: "Unique Italian Furniture & Décor",

  image: `${window.location.origin}${require("../images/logo.svg")}`,
  title: "STORITALIA - Timeless Stories of Italy",
  type: "website",
  url: window.location.origin,
};
