// <reference types="cypress" />
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
    cy.get("[data-cy=desktopMenuLoginOverlayLink]")
      .click()
      .get(".overlay")
      .should("exist");
  });

  describe("Login", () => {
    it("should successfully log in an user", () => {
      cy.loginUser("admin@example.com", "admin")
        .get("[data-cy=alert]")
        .should("contain", "You are now logged in");
    });

    it("should display an error if user does not exist", () => {
      cy
        .get("[data-cy=desktopMenuLoginOverlayLink]")
        .click()
        .get(".login__content input[name='email']")
        .type("thisUserIsNotRegistered@example.com")
        .get(".login__content input[name='password']")
        .type("thisisnotavalidpassword")
        .get("[data-cy=submitLoginFormButton]")
        .click()
      .get(".login__content .form-error", {timeoout: 20000})
        .should("contain", "Please, enter valid credentials");
    });
  });

  describe("Logout", () => {
    it("should successfully log out an user", () => {
      cy.loginUser("admin@example.com", "admin");
      cy.wait(2000);  // wait for reloading UI
      cy.logoutUser()
        .get("[data-cy=alert]")
        .should("contain", "You are now logged out");
    });
  });
});
