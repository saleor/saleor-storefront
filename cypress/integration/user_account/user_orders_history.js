// <reference types="cypress" />

describe("User orders histoy", () => {
  let polyfill = null;
  let user = null;

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

    cy.fixture('valid_user.json').then(
      (validUser)=>{
        user=validUser; 
        cy.loginUser(user.email, user.password);
      });

    cy.visit("/order-history/");

    });

  it("if user is logged in, when accessing order history and clicking load more button 10 orders should be visible", () => {
    cy
      .get(".account__content", {timeout:15000})
      .find("[data-cy=order__row]")
      .should("have.length", 5)
      .get("[data-cy=loadMoreOrdersButton]")
      .click()
      .get(".account__content")
      .find("[data-cy=order__row]")
      .should("have.length", 10);
  });

  it("if user is logged in, when accessing order history and clicking on order should move user to order view", () => {
    cy
      .get("[data-cy=order__row]:first", {timeout:15000})    
      .click();
    
      cy.location().should((loc) => {
        expect(loc.pathname).to.match(/^\/order-history\/[\w]+-[\w]+-[\w]+-[\w]+-[\w]+/);
      })
  
  });
});
