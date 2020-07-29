import { CATEGORY_SELECTORS } from "../../elements/category/category-page";

describe("Product list view", () => {
  beforeEach(() => {
    cy.server();
    cy.route("POST", `${Cypress.env("API_URI")}`).as("graphqlQuery");

    cy.visit("/category/accessories/7/");
  });

  it("should load more products when clicking on MORE button", () => {
    cy.get(CATEGORY_SELECTORS.loadMoreButton).click();
    cy.get(CATEGORY_SELECTORS.productTitleText).then(tiles =>
      expect(tiles.length).to.be.at.least(6)
    );
  });
});
