const openAccountMenu = testId => {
  return cy
    .get("[data-cy=user-btn]", { timeout: 15000 })
    .trigger("mouseover")
    .get(`[data-cy=${testId}]`)
    .click()
    .trigger("mouseout");
};

Cypress.Commands.add("openAccountMenu", openAccountMenu);
