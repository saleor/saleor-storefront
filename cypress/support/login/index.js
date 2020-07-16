import { userBuilder } from "../generate";
const mainMenuButton = "[data-test=desktopMenuLoginOverlayLink]";
const alertPopupMessage = "[data-test=alert]";
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
