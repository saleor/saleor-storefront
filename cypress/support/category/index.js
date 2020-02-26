const openFilterSidebar = () => {
  return cy
    .get("[data-cy=filters__button]")
    .click()
    .wait(500);
};

const openCategory = (index = 0) => {
  return cy
    .get("[data-cy=main-menu__item]")
    .eq(index)
    .click();
};

Cypress.Commands.add("openFilterSidebar", openFilterSidebar);
Cypress.Commands.add("openCategory", openCategory);
