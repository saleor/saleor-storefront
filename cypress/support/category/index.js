const openFilterSidebar = () => {
  return cy
    .get("[data-test=filtersButton]")
    .click();
};

const openCategory = (index = 0) => {
  return cy
    .get("[data-test=mainMenuItem]", {timeout: 5000})
    .eq(index)
    .click();
};

Cypress.Commands.add("openFilterSidebar", openFilterSidebar);
Cypress.Commands.add("openCategory", openCategory);
