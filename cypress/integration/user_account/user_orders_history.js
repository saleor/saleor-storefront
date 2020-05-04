// <reference types="cypress" />

describe("User orders histoy", () => {
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

  it("if user is logged in, when accessing order history at least 5 orders should be visible", () => {
    const user = { email: "admin@example.com", password: "admin" };
    cy.loginUser(user)
      .openAccountMenu("order_history__link")
      .findAllByTestId("order__row", { timeout: 15000 })
      .should("have.length", 5);
  });

  it("if user is logged in, when accessing order history and clicking load more button 10 orders should be visible", () => {
    const user = { email: "admin@example.com", password: "admin" };
    cy.loginUser(user)
      .openAccountMenu("order_history__link")
      .findByTestId("load_more__button", { timeout: 15000 })
      .click()
      .findAllByTestId("order__row", { timeout: 10000 })
      .should("have.length", 10);
  });

  it("if user is logged in, when accessing order history and clicking on order should move user to order view", () => {
    const user = { email: "admin@example.com", password: "admin" };
    cy.loginUser(user)
      .openAccountMenu("order_history__link")
      .findAllByTestId("order__row", { timeout: 10000 })
      .eq(0)
      .click();
  });
});
