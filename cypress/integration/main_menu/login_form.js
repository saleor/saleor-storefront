/// <reference types="cypress" />
import { userBuilder } from "../../support/generate";

describe("User login, logout and registration", () => {
  let user = null;

  beforeEach(() => {
    cy.visit("/");
  });

  it("should open overlay with a sign in and register form", () => {
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
        .get(".message__title", { timeout: 4000 })
        .contains("You are logged in");
    });

    it("should display an error if user does not exist", () => {
      const notRegisteredUser = userBuilder();
      cy.loginUser(notRegisteredUser)
        .get(".login__content .form-error", { timeout: 4000 })
        .contains("Please, enter valid credentials");
    });
  });

  describe("Logout", () => {
    it("should successfully log out an user", () => {
      const user = userBuilder();
      cy.registerUser(user).loginUser(user);
      cy.logoutUser()
        .get(".message__title", { timeout: 4000 })
        .should("contain", "You are logged out");
    });
  });
});
