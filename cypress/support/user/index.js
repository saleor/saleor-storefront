import { HEADER_SELECTORS } from "../../elements/main-header/header-selectors";
import { LOGIN_SELECTORS } from "../../elements/saleor-account/login-selectors";

Cypress.Commands.add("loginUser", () => {
  return cy
    .get(HEADER_SELECTORS.mainMenuButton)
    .click()
    .get(LOGIN_SELECTORS.emailAddressInput)
    .type(Cypress.env("USER_NAME"))
    .get(LOGIN_SELECTORS.emailPasswordInput)
    .type(Cypress.env("USER_PASSWORD"), { log: false })
    .get(LOGIN_SELECTORS.signInButton)
    .click()
    .get(LOGIN_SELECTORS.alertPopupMessage)
    .get(LOGIN_SELECTORS.signInButton)
    .should("not.exist");
});

Cypress.Commands.add("logoutUser", () =>
  cy
    .get(HEADER_SELECTORS.loggedInMainMenuButton)
    .click()
    .get(HEADER_SELECTORS.logOutButton)
    .click()
    .get(LOGIN_SELECTORS.alertPopupMessage)
    .should("contain", "You are now logged out")
);
