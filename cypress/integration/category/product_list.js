// <reference types="cypress" />

describe("Product list view", () => {
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

    cy.visit("/category/accessories/7/", {
      onBeforeLoad(win) {
        delete win.fetch;
        // since the application code does not ship with a polyfill
        // load a polyfilled "fetch" from the test
        win.eval(polyfill);
        win.fetch = win.unfetch;
      },
    });

  });

  it("category view should contain 6 visible products", () => {
    cy.get("[data-cy=product-tile").should("have.length", 6);
  });

  it("should load more products when clicking on MORE button", () => {
    cy.get("[data-cy=loadMoreProductsButton]")
      .click();
    
      cy.get("[data-cy=product-tile]").then((tiles)=>expect(tiles.length).to.be.at.least(6))
  });
});
