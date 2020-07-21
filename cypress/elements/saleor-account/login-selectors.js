export const LOGIN_SELECTORS = {
  alertPopupMessage: "[data-test=alert]",
  emailAddressInput: "[data-test=loginOverlay] input[name='email']",
  emailPasswordInput: "[data-test=loginOverlay] input[name='password']",
  signInButton: "[data-test=submit]",
  warningCredentialMessage: ":nth-child(1) > .input__error",
  registerNewAccount: "[data-test=registerTab]",
  registerButton: "[data-test=submitRegisterFormButton]",
  registrationConfirmationWarning: "[data-test=alert]",
};
