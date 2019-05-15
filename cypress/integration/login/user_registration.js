/// <reference types="cypress" />
import { userBuilder } from "../../support/generate";

describe.only("User registration", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  let user = null;

  it("should open ovarlay with a sign in and register form", () => {
    cy.getByTestId("login-btn")
      .click()
      .get(".overlay")
      .should("exist");
  });

  it("should register new user", () => {
    user = userBuilder();
    cy.registerUser(user)
      .get(".message__title")
      .contains("New user has been created.");
  });

  it("should display an error if user exists", () => {
    cy.registerUser(user)
      .get(".login__content input[name='email'] + .input__error")
      .contains("User with this Email already exists.");
  });
});
