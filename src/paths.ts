const baseUrl = "/";
const slugUrl = ":slug";
const accountBaseUrl = `${baseUrl}account/`;
const checkoutBaseUrl = `${baseUrl}checkout/`;

export const paths = {
  notFound: `${baseUrl}404`,
  accountConfirm: `${baseUrl}account-confirm`,
  cart: `${baseUrl}cart`,
  category: `${baseUrl}category/${slugUrl}`,
  collection: `${baseUrl}collection/${slugUrl}`,
  guestOrderDetail: `${baseUrl}order-history/:token`,
  home: baseUrl,
  login: `${baseUrl}login`,
  orderFinalized: `${baseUrl}order-finalized`,
  page: `${baseUrl}page/:slug`,
  passwordReset: `${baseUrl}reset-password`,
  product: `${baseUrl}product/${slugUrl}`,
  search: `${baseUrl}search`,
  wishlist: `${baseUrl}wishlist`,
  /**
   * Checkout
   */
  checkout: checkoutBaseUrl,
  checkoutAddress: `${checkoutBaseUrl}address`,
  checkoutPayment: `${checkoutBaseUrl}payment`,
  checkoutPaymentConfirm: `${checkoutBaseUrl}payment-confirm`,
  checkoutReview: `${checkoutBaseUrl}review`,
  checkoutShipping: `${checkoutBaseUrl}shipping`,
  /**
   * Account section
   */
  account: accountBaseUrl,
  accountAddressBook: `${accountBaseUrl}address-book`,
  // FIXME: User order should be accessible via order id
  accountOrderDetail: `${accountBaseUrl}order-history/:token`,
  accountOrderHistory: `${accountBaseUrl}order-history`,
};

/**
 * Paths which should not be generated at build time.
 */
export const DYNAMIC_REDIRECT_PATHS = [
  paths.accountOrderDetail,
  paths.guestOrderDetail,
];
