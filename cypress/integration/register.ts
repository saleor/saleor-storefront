import { userBuilder } from "../support/generate";
/// <reference types="cypress" />

describe.only("Register", () => {
  let user = null;
  beforeEach(() => {
    cy.visit("/");
  });

  it("should open ovarlay with a sign in and register form", () => {
    // cy.getByTestId("login-btn").click();
    // cy.get(".login__tabs span:not(.active-tab)").click();
  });

  it("should register new user", () => {
    user = userBuilder();
    // cy.getByTestId("login-btn").click();
    cy.get("[data-testid='login-btn']").click();
    cy.get(".login__tabs span:not(.active-tab)").click();
    cy.get(".login__content input[name='email']").type(user.email);
    cy.get(".login__content input[name='password']").type(user.password);
    cy.get(".login__content button[type='submit']").click();
    cy.get(".message__title").contains("New user has been created.");
  });

  it("should display an error if user exists", () => {
    cy.get("[data-testid='login-btn']").click();
    cy.get(".login__tabs span:not(.active-tab)").click();
    cy.get(".login__content input[name='email']").type(user.email);
    cy.get(".login__content input[name='password']").type(user.password);
    cy.get(".login__content button[type='submit']").click();

    cy.get(".login__content input[name='email'] + .input__error").contains(
      "User with this Email already exists."
    );
  });
});
