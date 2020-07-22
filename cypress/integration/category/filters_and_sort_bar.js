import { CATEGORY_SELECTORS } from "../../elements/category/category-page";
import { LEFT_FILTERS_SELECTORS } from "../../elements/filters-left-menu/filters-menu";

describe("Category view - filtering and sorting", () => {
  beforeEach(() => {
    cy.server();
    cy.route("POST", `${Cypress.env("API_URI")}`).as("graphqlQuery");

    cy.visit("/category/accessories/7/");
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
