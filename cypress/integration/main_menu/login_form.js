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

    cy.setup(polyfill);
    cy.wait("@graphqlQuery");
  });

  it("should open overlay with a sign in and register form", () => {
    cy.getByTestId("login-btn")
      .click()
      .get(".overlay")
      .should("exist");
  });

  describe("Login", () => {
    it("should display an error if user does not exist", () => {
      const notRegisteredUser = userBuilder();
      cy.loginUser(notRegisteredUser)
        .get(".login__content .form-error")
        .should("contain", "Please, enter valid credentials");
    });
  });
});
