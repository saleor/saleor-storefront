const openFilterSidebar = () => {
  const filterButton = "[data-test=filtersButton]";

  return cy.get(filterButton).click();
};

const openCategory = (index = 0) => {
  const leftMainMenu = "[data-test=mainMenuItem]";
  return cy.get(leftMainMenu, { timeout: 5000 }).eq(index).click();
};

Cypress.Commands.add("openFilterSidebar", openFilterSidebar);
Cypress.Commands.add("openCategory", openCategory);
