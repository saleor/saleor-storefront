import { CHECKOUT_SELECTORS } from "../../elements/products/checkout-selectors";

Cypress.Commands.add("shipping", () => {
  return cy
    .get(CHECKOUT_SELECTORS.SHIPPING_SELECTORS.shippingForms, {
      timeout: 20000,
    })
    .first()
    .click()
    .get(CHECKOUT_SELECTORS.nextCheckoutStepBtn)
    .click();
});

Cypress.Commands.add("payment", () => {
  return cy
    .get(CHECKOUT_SELECTORS.PAYMENT_SELECTORS.dummyPaymentMethod)
    .parent()
    .click()
    .get(CHECKOUT_SELECTORS.PAYMENT_SELECTORS.totalPrice)
    .invoke("text")
    .as("totalPrice")
    .get(CHECKOUT_SELECTORS.nextCheckoutStepBtn)
    .click();
});
