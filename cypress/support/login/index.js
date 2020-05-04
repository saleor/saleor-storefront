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

const loginOrRegisterUser = (type = "login", user) => {
  const tabSelector =
    type === "login"
      ? ".login__tabs span.active-tab"
      : ".login__tabs span:not(.active-tab)";

  return cy
    .findByTestId("login-btn")
    .click()
    .get(tabSelector)
    .click()
    .get(".login__content input[name='email']")
    .type(user.email)
    .get(".login__content input[name='password']")
    .type(user.password)
    .get(".login__content button[type='submit']")
    .click();
};

Cypress.Commands.add("registerUser", user =>
  loginOrRegisterUser("register", user)
);
Cypress.Commands.add("loginUser", user => loginOrRegisterUser("login", user));
Cypress.Commands.add("logoutUser", () =>
  cy
    .wait(10000)
    .findByTestId("user-btn", { timeout: 3000 })
    .trigger("mouseover")
    .findByTestId("logout-link")
    .click()
);
