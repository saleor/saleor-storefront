import faker from "faker";

import { HEADER_SELECTORS } from "../../elements/main-header/header-selectors";
import { ACCOUNT_SELECTORS } from "../../elements/main-header/my-account-selectors";

describe("Edit personal details", () => {
  beforeEach(() => {
    cy.loginUserViaRequest().visit("/");
  });

  const randomFirstName = faker.name.firstName();
  const randomLasttName = faker.name.lastName();

  it("should edit personal details", () => {
    cy.get(HEADER_SELECTORS.loggedInMainMenuButton)
      .click()
      .get(HEADER_SELECTORS.MAIN_MENU_DROPDOWN_SELECTORS.myAccount)
      .click()
      .get(ACCOUNT_SELECTORS.MY_ACCOUNT_SELECTORS.editPersonalDetails)
      .click()
      .get(ACCOUNT_SELECTORS.MY_ACCOUNT_SELECTORS.firstNameInput)
      .click()
      .clear()
      .type(randomFirstName)
      .get(ACCOUNT_SELECTORS.MY_ACCOUNT_SELECTORS.lastNameInput)
      .click()
      .clear()
      .type(randomLasttName)
      .get(ACCOUNT_SELECTORS.MY_ACCOUNT_SELECTORS.saveButton)
      .click()
      .get(ACCOUNT_SELECTORS.MY_ACCOUNT_SELECTORS.firstNameText)
      .contains(randomFirstName)
      .get(ACCOUNT_SELECTORS.MY_ACCOUNT_SELECTORS.lastNameText)
      .contains(randomLasttName);
  });
});
