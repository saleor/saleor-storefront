/* eslint-disable global-require */

import { generatePageUrl } from "./utils";

export const BASE_URL = "/";
export const PRODUCTS_PER_PAGE = 12;
export const SUPPORT_EMAIL = "support@example.com";
export const PROVIDERS = {
  BRAINTREE: {
    label: "Braintree",
  },
  DUMMY: {
    label: "Dummy",
  },
  STRIPE: {
    label: "Stripe",
  },
  ADYEN: {
    label: "Adyen",
    script: {
      src:
        "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.10.1/adyen.js",
      integrity:
        "sha384-wG2z9zSQo61EIvyXmiFCo+zB3y0ZB4hsrXVcANmpP8HLthjoQJQPBh7tZKJSV8jA",
      crossOrigin: "anonymous",
    },
    style: {
      src:
        "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.10.1/adyen.css",
      integrity:
        "sha384-8ofgICZZ/k5cC5N7xegqFZOA73H9RQ7H13439JfAZW8Gj3qjuKL2isaTD3GMIhDE",
      crossOrigin: "anonymous",
    },
  },
};
export const STATIC_PAGES = [
  {
    label: "Chi siamo",
    url: generatePageUrl("about"),
  },
  {
    label: "Team",
    url: generatePageUrl("team"),
  },
  {
    label: "Press",
    url: generatePageUrl("press"),
  },
  {
    label: "Contatti",
    url: generatePageUrl("about"),
  },
];
export const SOCIAL_MEDIA = [
  {
    ariaLabel: "instagram",
    href: `https://www.instagram.com/${process.env.SOCIAL_INSTAGRAM}`,
    path: require("../images/instagram-icon.svg"),
  },
  {
    ariaLabel: "vimeo",
    href: `https://www.vimeo.com/${process.env.SOCIAL_VIMEO}`,
    path: require("../images/vimeo-icon.svg"),
  },
];
export const META_DEFAULTS = {
  custom: [],
  description: "Unique Italian & Design & Home Décor",
  image: `${window.location.origin}${require("../images/logo.svg")}`,
  title: "STORITALIA - Timeless Stories of Italy -",
  type: "website",
  url: window.location.origin,
};
export enum CheckoutStep {
  Address = 1,
  Shipping,
  Payment,
  Review,
  PaymentConfirm,
}
export const CHECKOUT_STEPS = [
  {
    index: 0,
    link: "/checkout/address",
    name: "Address",
    nextActionName: "Continue to Shipping",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Address,
  },
  {
    index: 1,
    link: "/checkout/shipping",
    name: "Shipping",
    nextActionName: "Continue to Payment",
    onlyIfShippingRequired: true,
    step: CheckoutStep.Shipping,
  },
  {
    index: 2,
    link: "/checkout/payment",
    name: "Payment",
    nextActionName: "Continue to Review",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Payment,
  },
  {
    index: 3,
    link: "/checkout/review",
    name: "Review",
    nextActionName: "Place order",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Review,
  },
  {
    index: 4,
    link: "/checkout/payment-confirm",
    name: "Payment confirm",
    onlyIfShippingRequired: false,
    step: CheckoutStep.PaymentConfirm,
    withoutOwnView: true,
  },
];
