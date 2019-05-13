/// <reference types="cypress" />
import { userBuilder } from "../support/generate";

describe.only("Register", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should open ovarlay with sign in and register form", () => {
    cy.getByTestId("login-btn").click();
    cy.get(".login__tabs span:not(.active-tab)").click();
  });

  it("should open ovarlay with sign in and register form", () => {
    cy.getByTestId("login-btn").click();
    cy.get(".login__tabs span:not(.active-tab)").click();
  });

  it("should register new user", () => {
    const user = userBuilder();

    cy.getByTestId("login-btn").click();
    cy.get(".login__tabs span:not(.active-tab)").click();

    cy.get(".login__content input[name='email']").type(user.email);
    cy.get(".login__content input[name='password']").type(user.password);
    cy.get(".login__content button[type='submit']").click();

    cy.get(".message__title").contains("New user has been created.");
  });
});
