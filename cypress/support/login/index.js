import { userBuilder } from "../generate";
<<<<<<< HEAD
const mainMenuButton = "[data-test=desktopMenuLoginOverlayLink]";
const alertPopupMessage = "[data-test=alert]";
const emailAddressInput = "[data-test=loginOverlay] input[name='email']";
const emailPasswordInput = "[data-test=loginOverlay] input[name='password']";
const signInButton = "[data-test=submit]";
const loggedInMainMenuButton = "[data-test=userButton]";
const logOutButton = "[data-test=desktopMenuLogoutLink]";
=======
>>>>>>> WIP - adding buying a product test, refactor

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
<<<<<<< HEAD

Cypress.Commands.add("loginUser", (email, password) => {
  return cy
    .get(mainMenuButton)
    .click()
    .get(emailAddressInput)
    .type(email)
    .get(emailPasswordInput)
    .type(password, { log: false })
    .get(signInButton)
    .click()
    .get(alertPopupMessage)
    .should("contain", "You are now logged in");
});

Cypress.Commands.add("logoutUser", () =>
  cy
    .get(loggedInMainMenuButton)
    .click()
    .get(logOutButton)
    .click()
    .get(alertPopupMessage)
    .should("contain", "You are now logged out")
);
=======
>>>>>>> WIP - adding buying a product test, refactor
