import faker from "faker";

import { HEADER_SELECTORS } from "../../elements/main-header/header-selectors";
import { PRODUCTS_SELECTORS } from "../../elements/products/products-selectors";
import { CHECKOUT_SELECTORS } from "../../elements/products/checkout-selectors";

describe("Buy a product as a logged user", () => {
  beforeEach(() => {
    cy.noUILogin().clearCart();
  });

  it("should buy a product", () => {
    const firstProductName = PRODUCTS_SELECTORS.first_selected_product_name;
    const address = {
      fakeFirstNameText: faker.name.firstName(),
      fakeLastNameInputText: faker.name.lastName(),
      fakeCompanyNameText: faker.company.companyName(),
      fakeAddressLine1Text: faker.address.streetAddress(),
      fakeAddressLine2Text: faker.address.secondaryAddress(),

      phoneNum: "205-201-1178",
      city: "Alabama",
      zipCode: "35005",
      country: "United States of America",
      state: "AL",
    };

    cy.visit("/")
      .get(PRODUCTS_SELECTORS.product_list)
      .first()
      .click()
      .get(PRODUCTS_SELECTORS.first_selected_product_name)
      .get(PRODUCTS_SELECTORS.variantPicker)
      .click()
      .get(PRODUCTS_SELECTORS.attributOptions)
      .first()
      .click()
      .get(PRODUCTS_SELECTORS.addToBasketBtn)
      .click()
      .get(PRODUCTS_SELECTORS.cartQuantity)
      .should("be.visible")
      .click()
      .get(PRODUCTS_SELECTORS.goToBagMyBagBtn)
      .click()
      .get(PRODUCTS_SELECTORS.procceedToCheckoutBtn)
      .click()
      .get('a[href="/checkout/address"]') // TO DO - will be fixed
      .click()
      .addNewAddress(address)
      .get(CHECKOUT_SELECTORS.ADDRESS_SELECTORS.addressTiles)
      .last()
      .click()
      .get(CHECKOUT_SELECTORS.nextCheckoutStepBtn)
      .click()
      .get(CHECKOUT_SELECTORS.SHIPPING_SELECTORS.shippingForms)
      .first()
      .click()
      .get(CHECKOUT_SELECTORS.nextCheckoutStepBtn)
      .click()
      .get(CHECKOUT_SELECTORS.PAYMENT_SELECTORS.sameAsShippingAddressCheckbox)
      .parent()
      .click()
      .get(CHECKOUT_SELECTORS.PAYMENT_SELECTORS.dummyPaymentMethod)
      .parent()
      .click()
      .get(CHECKOUT_SELECTORS.nextCheckoutStepBtn)
      .click()
      .get(CHECKOUT_SELECTORS.REVIEW_SELECTORS.shippingAddressTile)
      .should("contain", address.fakeFirstNameText)
      .and("contain", address.fakeLastNameInputText)
      .and("contain", address.fakeCompanyNameText)
      .and("contain", address.fakeAddressLine1Text)
      .and("contain", address.fakeAddressLine2Text)
      .and("contain", address.city.toUpperCase())
      .and("contain", address.country)
      .and("contain", address.phoneNum.replace(/-/gi, ""))
      .and("contain", address.state)
      .and("contain", address.zipCode)
      .get(CHECKOUT_SELECTORS.REVIEW_SELECTORS.placeOrder)
      .click()
      .get(CHECKOUT_SELECTORS.ORDER_FINALIZED.confirmationView)
      .should("be.visible");
  });
});
