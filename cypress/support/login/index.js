import { userBuilder } from "../generate";
const mainMenuButton = "[data-test=desktopMenuLoginOverlayLink]";
const allertPopupMessage = "[data-test=alert]";
const emailAddressInput = "[data-test=loginOverlay] input[name='email']";
const emailPasswordInput = "[data-test=loginOverlay] input[name='password']";
const signInButton = "[data-test=submit]";
const loggedInMainMenuButton = "[data-test=userButton]";
const logOutButton = "[data-test=desktopMenuLogoutLink]";

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
    .get(mainMenuButton)
    .click()
    .get(emailAddressInput)
    .type(email)
    .get(emailPasswordInput)
    .type(password)
    .get(signInButton)
    .click()
    .get(allertPopupMessage, { timeout: 3000 })
    .should("contain", "You are now logged in", { timeoout: 20000 });
});

Cypress.Commands.add("logoutUser", () =>
  cy
    .get(loggedInMainMenuButton)
    .click()
    .get(logOutButton)
    .click()
    .get(allertPopupMessage, { timeout: 3000 })
    .should("contain", "You are now logged out", { timeoout: 20000 })
);
