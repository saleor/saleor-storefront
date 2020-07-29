Cypress.Commands.add("openFilterSidebar", () => {
  const filterButton = "[data-test=filtersButton]";

  return cy.get(filterButton).click();
});

Cypress.Commands.add("openCategory", (index = 0) => {
  const leftMainMenu = "[data-test=mainMenuItem]";

  return cy.get(leftMainMenu, { timeout: 5000 }).eq(index).click();
});
