export const CHECKOUT_SELECTORS = {
  addNewAddress: "[data-test=addressTileAddNew]",
  nextCheckoutStepBtn: "[data-test='checkoutPageNextStepButton']",

  ADDRESS_SELECTORS: {
    firstNameInput: "[name='firstName']",
    lastNameInput: "[name='lastName']",
    companyName: "[name='companyName']",
    phoneNum: "[name='phone']",
    addressLine1: "[name='streetAddress1']",
    addressLine2: "[name='streetAddress2']",
    city: "[name='city']",
    zip_postalCode: "[name='postalCode']",
    country: "#react-select-2-input",
    state: "[name='countryArea']",
    addressTiles: "[data-test=addressTile]",
    addBtn: "[data-test=submitAddressFormModalButton]",
  },
  SHIPPING_SELECTORS: {
    shippingForms: "#shipping-form label",
  },
  PAYMENT_SELECTORS: {
    sameAsShippingAddressCheckbox:
      "[data-test='checkoutPaymentBillingAsShippingCheckbox']",
    dummyPaymentMethod: "[data-test='checkoutPaymentGatewayDummyInput']",
    totalPrice: "[data-test=cartSummaryCostTotal] > span",
  },
  REVIEW_SELECTORS: {
    shippingAddressTile:
      "[data-test=shippingAddressSection] > [data-test=addressTile]",
    placeOrder: "[data-test=checkoutPageNextStepButton]",
  },
  ORDER_FINALIZED: {
    confirmationView: "[data-test=thankYouView]",
    orderDetails: "[data-test=gotoOrderDetailsButton]",
  },
  CHECKOUT_LINKS: {
    address: 'a[href="/checkout/address"]',
  },
};
