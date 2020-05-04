const openAccountMenu = testId => {
  return cy
    .wait(10000)
    .findByTestId("user-btn", { timeout: 15000 })
    .trigger("mouseover")
    .findByTestId(testId)
    .click()
    .trigger("mouseout");
};

Cypress.Commands.add("openAccountMenu", openAccountMenu);
