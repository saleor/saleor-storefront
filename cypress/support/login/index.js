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
    .get("[data-test=desktopMenuLoginOverlayLink]")
    .click()
    .get("[data-test=loginOverlay] input[name='email']")
    .type(email)
    .get("[data-test=loginOverlay] input[name='password']")
    .type(password)
    .get("[data-test=submit]")
    .click()
    .get("[data-test=alert]")
    .should("contain", "You are now logged in", {timeoout: 20000});
});

Cypress.Commands.add("logoutUser", () =>
  cy
    .get("[data-test=userButton]")
    .click()
    .get("[data-test=desktopMenuLogoutLink]")
    .click()
    .get("[data-test=alert]")
    .should("contain", "You are now logged out", {timeoout: 20000})
);
