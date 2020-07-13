import { CATEGORY_SELECTORS } from "../../elements/category/category-page";
import { LEFT_FILTERS_SELECTORS } from "../../elements/filters-left-menu/filters-menu";

describe("Category view - filtering and sorting", () => {
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

  it("should show correct number of products in category if no filtering applied", () => {
    cy.get(CATEGORY_SELECTORS.productFoundCounter).should(
      "have.text",
      "Products found: 8"
    ); // we can't be sure that there always ll be 8 items
  });

  it("should show filter sidebar after clicking on filter menu", () => {
    cy.get(LEFT_FILTERS_SELECTORS.filterSidebar)
      .should("have.length", 0)
      .openFilterSidebar()
      .get(LEFT_FILTERS_SELECTORS.filterSidebar)
      .should("have.length", 1);
  });

  it("should hide filter sidebar after clicking on close icon button", () => {
    cy.get(LEFT_FILTERS_SELECTORS.filterSidebar)
      .should("have.length", 0)
      .openFilterSidebar()
      .get(LEFT_FILTERS_SELECTORS.filterSidebar)
      .should("have.length", 1)
      .get(LEFT_FILTERS_SELECTORS.closeFilterSidebar)
      .click()
      .get(LEFT_FILTERS_SELECTORS.filterSidebar)
      .should("have.length", 0);
  });

  xit("should filter products after clicking on filter attribute", () => {
    cy.openFilterSidebar()
      .get("label")
      .first()
      .click()
      .get(CATEGORY_SELECTORS.productFoundCounter)
      .should("have.text", "Products found: 5") // we can't be sure that there always ll be 5 items
      .get(CATEGORY_SELECTORS.productTitleText)
      .should("have.length", 5);
  });
});
function productsFoundCounter() {
  return CATEGORY_SELECTORS.productFoundCounter;
}
