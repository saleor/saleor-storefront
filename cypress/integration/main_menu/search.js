// <reference types="cypress" />

describe.only("Search", () => {
  const typedText = "t";
  let polyfill;

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

  it("should show input on click", () => {
    cy.get(".main-menu__search")
      .click()
      .get("form.search input")
      .should("exist");
  });

  it("should search products", () => {
    cy.get(".main-menu__search")
      .click()
      .get("form.search input")
      .type(typedText)
      .get(".search__products.search__products--expanded")
      .should("exist");
  });

  it("should redirect to Search page on form submit", () => {
    cy.get(".main-menu__search")
      .click()
      .get("form.search input")
      .type(typedText)
      .get("form.search button[type='submit']")
      .click();

    cy.url().should("include", `/search/?q=${typedText}`);
    cy.get(".search-page").should("exist");
    cy.focused().should("have.value", typedText);
  });
});
