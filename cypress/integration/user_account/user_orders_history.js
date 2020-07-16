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

    cy.visit("/order-history/");
  });

  xit("if user is logged in, when accessing order history and clicking load more button 10 orders should be visible", () => {
    //xited becouse this tests need to be changed with new DB
    cy.get(".account__content", { timeout: 15000 })
      .find("[data-test=orderEntry]")
      .should("have.length", 5)
      .get("[data-test=loadMoreOrdersButton]")
      .click()
      .get(".account__content")
      .find("[data-test=orderEntry]")
      .should("have.length", 10);
  });

  xit("if user is logged in, when accessing order history and clicking on order should move user to order view", () => {
    //xited becouse this tests need to be changed with new DB
    cy.get("[data-test=orderEntry]:first", { timeout: 15000 }).click();

    cy.location().should(loc => {
      expect(loc.pathname).to.match(
        /^\/order-history\/[\w]+-[\w]+-[\w]+-[\w]+-[\w]+/
      );
    });
  });
});
