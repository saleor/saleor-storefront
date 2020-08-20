// <reference types="cypress" />

import "./user";
import "./category";
import "./cart";
import "./checkout";
import "./product";

import { HEADER_SELECTORS } from "../elements/main-header/header-selectors";
import { LOGIN_SELECTORS } from "../elements/saleor-account/login-selectors";
import { CHECKOUT_SELECTORS } from "../elements/products/checkout-selectors";

Cypress.on("uncaught:exception", () => {
  return false;
});

Cypress.Commands.add("addNewAddress", address => {
  return cy
    .get(
      CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS
        .firstNameShippingAddressInput
    )
    .click()
    .type(address.fakeFirstNameText)
    .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.lastNameInput)
    .click()
    .type(address.fakeLastNameInputText)
    .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.companyName)
    .click()
    .type(address.fakeCompanyNameText)
    .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.phoneNum)
    .click()
    .type(address.phoneNum)
    .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.addressLine1)
    .click()
    .type(address.fakeAddressLine1Text)
    .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.addressLine2)
    .click()
    .type(address.fakeAddressLine2Text)
    .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.city)
    .click()
    .type(address.city)
    .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.zip_postalCode)
    .click()
    .type(address.zipCode)
    .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.country)
    .click()
    .get(".css-1pcexqc-container") // TODO - will change that when I ll add a better selector to it
    .first()
    .click()
    .type(`${address.country}{enter}`)
    .get(CHECKOUT_SELECTORS.SHIPPING_ADDRESS_SELECTORS.state)
    .click()
    .type(address.state);
});
