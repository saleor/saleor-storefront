import { HEADER_SELECTORS } from "../../elements/main-header/header-selectors";
import { LOGIN_SELECTORS } from "../../elements/saleor-account/login-selectors";

Cypress.Commands.add("loginUserViaForm", () =>
  cy
    .get(HEADER_SELECTORS.mainMenuButton)
    .click()
    .get(LOGIN_SELECTORS.emailAddressInput)
    .type(Cypress.env("USER_NAME"))
    .get(LOGIN_SELECTORS.emailPasswordInput)
    .type(Cypress.env("USER_PASSWORD"), { log: false })
    .get(LOGIN_SELECTORS.signInButton)
    .click()
    .get(LOGIN_SELECTORS.alertPopupMessage, { timeout: 20000 })
);

Cypress.Commands.add("logoutUser", () =>
  cy
    .get(HEADER_SELECTORS.loggedInMainMenuButton)
    .click()
    .get(HEADER_SELECTORS.logOutButton)
    .click()
    .get(LOGIN_SELECTORS.alertPopupMessage, { timeout: 20000 })
    .should("contain", "You are now logged out")
);

Cypress.Commands.add("loginUserViaRequest", () =>
  cy
    .request({
      method: "POST",
      url: Cypress.env("API_URI"),
      body: [
        {
          operationName: "TokenAuth",
          variables: {
            email: Cypress.env("USER_NAME"),
            password: Cypress.env("USER_PASSWORD"),
          },
          query:
            "mutation TokenAuth($email: String!, $password: String!) {\n  tokenCreate(email: $email, password: $password) {\n    token\n    errors: accountErrors {\n      code\n      field\n      message\n      __typename\n    }\n    user {\n      id\n      __typename\n    }\n    __typename\n  }\n}\n",
        },
      ],
    })
    .then(resp => {
      window.localStorage.setItem("token", resp.body[0].data.tokenCreate.token);
    })
);
