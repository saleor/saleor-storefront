import { HEADER_SELECTORS } from "../../elements/main-header/header-selectors";

describe("Search", () => {
  const typedText = "shirt";

  beforeEach(() => {
    cy.visit("/", {});
  });

  it("should show input on click", () => {
    cy.get(HEADER_SELECTORS.mainMenuSearchButton)
      .click()
      .get(HEADER_SELECTORS.mainMenuSearchInput)
      .should("exist");
  });

  it("should search products", () => {
    const searchProductsExpandedArea =
      ".search__products.search__products--expanded";

    cy.get(HEADER_SELECTORS.mainMenuSearchButton)
      .click()
      .get(HEADER_SELECTORS.mainMenuSearchInput)
      .type(typedText)
      .get(searchProductsExpandedArea)
      .should("exist");
  });

  it("should redirect to Search page on form submit", () => {
    const showAllresultsButton = "form.search button[type='submit']";
    const searchPageHeader = ".search-page";

    cy.get(HEADER_SELECTORS.mainMenuSearchButton)
      .click()
      .get(HEADER_SELECTORS.mainMenuSearchInput)
      .type(typedText)
      .get(showAllresultsButton)
      .click();

    cy.url().should("include", `/search/?q=${typedText}`);
    cy.get(searchPageHeader).should("exist");
    cy.focused().should("have.value", typedText);
  });
});
