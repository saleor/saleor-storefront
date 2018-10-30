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
