const openFilterSidebar = () => {
  return cy
    .get("[data-cy=filters__button]")
    .click();
};

const openCategory = (index = 0) => {
  return cy
    .get("[data-cy=main-menu__item]", {timeout: 5000})
    .eq(index)
    .click();
};

Cypress.Commands.add("openFilterSidebar", openFilterSidebar);
Cypress.Commands.add("openCategory", openCategory);
