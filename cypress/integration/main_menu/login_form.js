/// <reference types="cypress" />
import { userBuilder } from "../../support/generate";

describe.only("User login, logout and registration", () => {
  let user = null;

  beforeEach(() => {
    cy.visit("/");
  });

  it("should open ovarlay with a sign in and register form", () => {
    cy.getByTestId("login-btn")
      .click()
      .get(".overlay")
      .should("exist");
  });

  describe("Registration", () => {
    it("should register a new user", () => {
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

  describe("Login", () => {
    it("should successfully log in an user", () => {
      cy.loginUser(user)
        .get(".message__title")
        .contains("You are logged in");
    });

    it("should display an error if user does not exist", () => {
      const user = userBuilder();
      cy.loginUser(user)
        .get(".login__content .form-error")
        .contains("Please, enter valid credentials");
    });
  });

  describe("Logout", () => {
    it("should successfully log out an user", () => {
      cy.loginUser(user);
    });
  });
});
