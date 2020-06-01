import { userBuilder } from "../generate";

const createUser = () => {
  const user = userBuilder();
  return cy
    .request({
      body: user,
      method: "POST",
      url: `${Cypress.env("API_URI")}`,
    })
    .then(response => response.body.user);
};
Cypress.Commands.add("createUser", createUser);

Cypress.Commands.add("loginUser", (email, password) => {
  return cy
    .get("[data-cy=desktopMenuLoginOverlayLink]")
    .click()
    .get("[data-cy=accountOverlayLoginTab]")
    .click()
    .get(".login__content input[name='email']")
    .type(email)
    .get(".login__content input[name='password']")
    .type(password)
    .get("[data-cy=submitLoginFormButton]")
    .click()
    .get("[data-cy=alert]")
    .should("contain", "You are now logged in", {timeoout: 20000});
});

Cypress.Commands.add("logoutUser", () =>
  cy
    .get("[data-cy=userButton]")
    .click()
    .get("[data-cy=desktopMenuLogoutLink]")
    .click()
    .get("[data-cy=alert]")
    .should("contain", "You are now logged out", {timeoout: 20000})
);
