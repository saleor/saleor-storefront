export const CHECKOUT_SELECTORS = {
  addNewShippingAddress: "[data-test=shippingAddressTileAddNew]",
  addNewBillingAddress: "[data-test=billingAddressTileAddNew]",
  nextCheckoutStepBtn: "[data-test='checkoutPageNextStepButton']",
  continueAsAGuest: "[data-test='continueAsGuestButton']",

  SHIPPING_ADDRESS_SELECTORS: {
    shippingModal: "[data-test='submitAddressFormModal']",
    shippingAddressForm: "[data-test=shippingAddressForm]",
    billingAddressForm: "[data-test='billingAddressForm']",

    firstNameShippingAddressInput: "[name='firstName']",
    lastNameInput: "[name='lastName']",
    companyName: "[name='companyName']",
    phoneNum: "[name='phone']",
    addressLine1: "[name='streetAddress1']",
    addressLine2: "[name='streetAddress2']",
    city: "[name='city']",
    zip_postalCode: "[name='postalCode']",
    country: "#react-select-2-input",
    state: "[name='countryArea']",

    shippingAddressTiles: "[data-test=shippingAddressTile]",
    billingAddressTiles: "[data-test=billingAddressTile]",
    addBtn: "[data-test=submitAddressFormModalButton]",
    sameAsShippingAddressCheckbox:
      "[data-test='checkoutAddressBillingAsShippingCheckbox']",
    emailInput: "[name='email']",
    continueToShipping: "[data-test=checkoutPageNextStepButton]",
  },
  SHIPPING_SELECTORS: {
    shippingForms: "#shipping-form label",
  },
  PAYMENT_SELECTORS: {
    dummyPaymentMethod: "[data-test='checkoutPaymentGatewayDummyInput']",
    totalPrice: "[data-test=cartSummaryCostTotal] > span",
  },
  REVIEW_SELECTORS: {
    shippingAddressTile:
      "[data-test=shippingAddressSection] > [data-test=addressTile]",
    billingAddressTile: "[data-test=addressTile]",
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
