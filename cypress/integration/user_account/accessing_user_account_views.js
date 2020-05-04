// <reference types="cypress" />

describe("Accessing user account views", () => {
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

  it("if user is logged in, dropdown menu should be visible while hovering over user button", () => {
    const user = { email: "admin@example.com", password: "admin" };
    cy.loginUser(user)
      .wait(10000)
      .findByTestId("user-btn", { timeout: 15000 })
      .trigger("mouseover");
  });

  it("should transfer user to account view after clicking option in menu", () => {
    const user = { email: "admin@example.com", password: "admin" };
    cy.loginUser(user).wait(10000);
    [
      { classId: "my_account__link", url: "/account/" },
      { classId: "order_history__link", url: "/order-history/" },
      { classId: "address_book__link", url: "/address-book/" },
    ].forEach(accountView => {
      cy.openAccountMenu(accountView.classId).wait(3000);
      cy.location("pathname").should("eq", accountView.url);
    });
  });
});
