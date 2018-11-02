import { generatePageUrl } from "./utils";

export const PRODUCTS_PER_PAGE = 8;

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
    path: "../../images/facebook-icon.svg"
  },
  {
    ariaLabel: "instagram",
    href: "https://www.instagram.com/mirumeelabs/",
    path: "../../images/instagram-icon.svg"
  },
  {
    ariaLabel: "twitter",
    href: "https://twitter.com/getsaleor",
    path: "../../images/twitter-icon.svg"
  },
  {
    ariaLabel: "youtube",
    href: "https://www.youtube.com/channel/UCg_ptb-U75e7BprLCGS4s1g/videos",
    path: "../../images/youtube-icon.svg"
  }
];
