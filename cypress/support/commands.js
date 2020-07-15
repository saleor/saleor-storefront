// <reference types="cypress" />
import faker from "faker";

import "./login";
import "./category";

import { HEADER_SELECTORS } from "../elements/main-header/header-selectors";
import { LOGIN_SELECTORS } from "../elements/saleor-account/login-selectors";
import { CHECKOUT_SELECTORS } from "../elements/products/checkout-selectors";

Cypress.on("uncaught:exception", () => {
  return false;
});

Cypress.Commands.add("setup", polyfill => {
  cy.visit("/", {
    onBeforeLoad(win) {
      delete win.fetch;
      win.eval(polyfill);
      win.fetch = win.unfetch;
    },
  });
});

Cypress.Commands.add("loginUser", () => {
  cy.get(HEADER_SELECTORS.mainMenuButton)
    .click()
    .get(LOGIN_SELECTORS.emailAddressInput)
    .type(LOGIN_SELECTORS.email)
    .get(LOGIN_SELECTORS.emailPasswordInput)
    .type(LOGIN_SELECTORS.password)
    .get(LOGIN_SELECTORS.signInButton)
    .click()
    .get(LOGIN_SELECTORS.allertPopupMessage)
    .should("contain", "You are now logged in", { timeoout: 20000 });
});

Cypress.Commands.add("addNewAddress", () => {
  const fakeAdressText = () => ({
    fakeFirstNameText: faker.name.firstName(),
    fakeLastNameInputText: faker.name.lastName(),
    fakeCompanyNameText: faker.company.companyName(),
    fakePhoneNumText: faker.phone.phoneNumber(),
    fakeAddressLine1Text: faker.address.streetAddress(),
    fakeAddressLine2Text: faker.address.secondaryAddress(),
    fakeCityText: faker.address.city(),
    fakeZip_postalCodeText: faker.address.zipCode(),
    fakeCountryText: faker.address.country(),
    fakeStateText: faker.address.state(),
  });

  cy.get(CHECKOUT_SELECTORS.addNewAddress)
    .click()
    .get(CHECKOUT_SELECTORS.ADD_NEW_ADDRESS_SELECTORS.firstNameInput)
    .click()
    .type(fakeAdressText.fakeFirstNameText)
    .get(CHECKOUT_SELECTORS.ADD_NEW_ADDRESS_SELECTORS.lastNameInput)
    .click()
    .type(fakeAdressText.fakeLastNameInputText)
    .get(CHECKOUT_SELECTORS.ADD_NEW_ADDRESS_SELECTORS.companyName)
    .click()
    .type(fakeAdressText.fakeCompanyNameText)
    .get(CHECKOUT_SELECTORS.ADD_NEW_ADDRESS_SELECTORS.phoneNum)
    .click()
    .type(fakeAdressText.fakePhoneNumText)
    .get(CHECKOUT_SELECTORS.ADD_NEW_ADDRESS_SELECTORS.addressLine1)
    .click()
    .type(fakeAdressText.addressLine1)
    .get(CHECKOUT_SELECTORS.ADD_NEW_ADDRESS_SELECTORS.addressLine2)
    .click()
    .type(fakeAdressText.addressLine2)
    .get(CHECKOUT_SELECTORS.ADD_NEW_ADDRESS_SELECTORS.city)
    .click()
    .type(fakeAdressText.fakeCityText)
    .get(CHECKOUT_SELECTORS.ADD_NEW_ADDRESS_SELECTORS.zip_postalCode)
    .click()
    .type(fakeAdressText.fakeZip_postalCodeText)
    .get(CHECKOUT_SELECTORS.ADD_NEW_ADDRESS_SELECTORS.country)
    .click()
    .type(fakeAdressText.fakeCountryText)
    .get(CHECKOUT_SELECTORS.ADD_NEW_ADDRESS_SELECTORS.state)
    .click()
    .type(fakeAdressText.fakeStateText);
});
