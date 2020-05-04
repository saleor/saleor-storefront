// <reference types="cypress" />
import { userBuilder } from "../../support/generate";

describe("User login, logout and registration", () => {
  let user = null;
  let polyfill = null;

  before(() => {
    const polyfillUrl = "https://unpkg.com/unfetch/dist/unfetch.umd.js";
    cy.request(polyfillUrl).then(response => {
      polyfill = response.body;
    });
  });

  beforeEach(() => {
    cy.server();
    cy.route("POST", `${Cypress.env("API_URI")}`).as("graphqlQuery");

    cy.visit("/", {
      onBeforeLoad(win) {
        delete win.fetch;
        // since the application code does not ship with a polyfill
        // load a polyfilled "fetch" from the test
        win.eval(polyfill);
        win.fetch = win.unfetch;
      },
    });
  });

  it("should open overlay with a sign in and register form", () => {
    cy.findByTestId("login-btn")
      .click()
      .get(".overlay")
      .should("exist");
  });

  describe("Login", () => {
    it("should successfully log in an user", () => {
      user = { email: "admin@example.com", password: "admin" };
      cy.loginUser(user)
        .get("[data-cy=alert]")
        .should("contain", "You are now logged in");
    });
    it("should display an error if user does not exist", () => {
      const notRegisteredUser = userBuilder();
      cy.loginUser(notRegisteredUser)
        .get(".login__content .form-error")
        .should("contain", "Please, enter valid credentials");
    });
  });

  describe("Logout", () => {
    it("should successfully log out an user", () => {
      user = { email: "admin@example.com", password: "admin" };
      cy.loginUser(user);
      cy.wait(15000);
      cy.logoutUser()
        .get("[data-cy=alert]")
        .should("contain", "You are now logged out");
    });
  });
});
