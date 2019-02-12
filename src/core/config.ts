import { generatePageUrl } from "./utils";
import { mdiFacebook, mdiInstagram, mdiTwitter, mdiYoutube } from "@mdi/js";

export const BASE_URL = "/";
export const PRODUCTS_PER_PAGE = 8;
export const SUPPORT_EMAIL = "support@example.com";
export enum PROVIDERS {
  BRAINTREE,
  DUMMY
}
export const STATIC_PAGES = [
  {
    label: "About",
    url: generatePageUrl("about")
  }
];
export const SOCIAL_MEDIA = [
  {
    ariaLabel: "facebook",
    href: "https://www.facebook.com/mirumeelabs/",
    path: mdiFacebook
  },
  {
    ariaLabel: "instagram",
    href: "https://www.instagram.com/mirumeelabs/",
    path: mdiInstagram
  },
  {
    ariaLabel: "twitter",
    href: "https://twitter.com/getsaleor",
    path: mdiTwitter
  },
  {
    ariaLabel: "youtube",
    href: "https://www.youtube.com/channel/UCg_ptb-U75e7BprLCGS4s1g/videos",
    path: mdiYoutube
  }
];
export const META_DEFAULTS = {
  custom: [],
  description: "PWA Storefront",

  image: `${window.location.origin}${require("../images/logo.svg")}`,
  title: "Saleor",
  type: "website",
  url: window.location.origin
};
