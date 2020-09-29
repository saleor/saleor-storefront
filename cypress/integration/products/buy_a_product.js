import faker from "faker";

import { HEADER_SELECTORS } from "../../elements/main-header/header-selectors";
import { PRODUCTS_SELECTORS } from "../../elements/products/products-selectors";
import { CHECKOUT_SELECTORS } from "../../elements/products/checkout-selectors";

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

describe("Buy a product", () => {
  it("should buy a shipping product as a logged in user", () => {
    const firstProductName = PRODUCTS_SELECTORS.first_selected_product_name;

    cy.clearLocalStorage();
    cy.loginUserViaRequest()
      .visit("/")
      .clearCart()
      .addItemWithShippingToTheBasket()
      .get(PRODUCTS_SELECTORS.proceedToCheckoutBtn)
      .click()
      .get(CHECKOUT_SELECTORS.CHECKOUT_LINKS.address)
      .click()
      .get(CHECKOUT_SELECTORS.addNewShippingAddress)
      .first()
      .click()
      .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.shippingModal)
      .within(() => {
        return cy.addNewAddress(address);
      })
      .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.addBtn)
      .click()
      .should("not.exist")
      .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.shippingAddressTiles)
      .last()
      .click()
      .get(
        CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS
          .sameAsShippingAddressCheckbox
      )
      .parent()
      .click()
      .get(CHECKOUT_SELECTORS.nextCheckoutStepBtn)
      .click()
      .shipping()
      .payment()
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
      .should("be.visible", { timeout: 20000 });
  });

  it("should buy a shipping product as a not logged in user", () => {
    cy.clearLocalStorage();
    cy.visit("/")
      .clearCart()
      .addItemWithShippingToTheBasket()
      .get(PRODUCTS_SELECTORS.proceedToCheckoutBtn)
      .click()
      .get(CHECKOUT_SELECTORS.continueAsAGuest)
      .click()
      .get(CHECKOUT_SELECTORS.CHECKOUT_LINKS.address)
      .click()
      .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.shippingAddressForm)
      .within(() => {
        return cy.addNewAddress(address);
      })
      .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.emailInput)
      .type("testers@saleor.io")
      .get(
        CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS
          .sameAsShippingAddressCheckbox
      )
      .parent()
      .click()
      .get(CHECKOUT_SELECTORS.nextCheckoutStepBtn)
      .click()
      .shipping()
      .payment()
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
      .should("be.visible", { timeout: 20000 });
  });

  it("should buy a NOT shipping product as a logged in user", () => {
    const firstProductName = PRODUCTS_SELECTORS.first_selected_product_name;
    cy.clearLocalStorage();
    cy.loginUserViaRequest()
      .visit("/")
      .clearCart()
      .addItemWithNoShippingToTheBasket()
      .get(PRODUCTS_SELECTORS.proceedToCheckoutBtn)
      .click()
      .get(CHECKOUT_SELECTORS.CHECKOUT_LINKS.address)
      .click()
      .get(CHECKOUT_SELECTORS.addNewBillingAddress)
      .first()
      .click()
      .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.shippingModal)
      .within(() => {
        return cy.addNewAddress(address);
      })
      .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.addBtn)
      .click()
      .should("not.exist")
      .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.billingAddressTiles)
      .last()
      .click()
      .get(CHECKOUT_SELECTORS.nextCheckoutStepBtn)
      .click()
      .payment()
      .get(CHECKOUT_SELECTORS.REVIEW_SELECTORS.billingAddressTile)
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
      .should("be.visible", { timeout: 20000 });
  });

  xit("should buy a NOT shipping product as a NOT logged in user", () => {
    cy.clearLocalStorage();
    cy.visit("/")
      .clearCart()
      .addItemWithNoShippingToTheBasket()
      .get(PRODUCTS_SELECTORS.proceedToCheckoutBtn)
      .click()
      .get(CHECKOUT_SELECTORS.continueAsAGuest)
      .click()
      .get(CHECKOUT_SELECTORS.CHECKOUT_LINKS.address)
      .click()
      .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.billingAddressForm)
      .within(() => {
        return cy.addNewAddress(address);
      })
      .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.emailInput)
      .type("testers@saleor.io")
      .get(CHECKOUT_SELECTORS.nextCheckoutStepBtn)
      .click()
      .payment()
      .get(CHECKOUT_SELECTORS.REVIEW_SELECTORS.billingAddressTile)
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
      .should("be.visible", { timeout: 20000 });
  });
});
