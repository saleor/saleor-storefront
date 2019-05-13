import { userBuilder } from "./generate";

declare global {
  namespace Cypress {
    interface Chainable {
      createUser: typeof createUser;
    }
  }
}

function createUser() {
  const user = userBuilder();
  return cy
    .request({
      body: user,
      method: "POST",
      url: "http://localhost:3000/graphql"
    })
    .then(response => response.body.user);
}

Cypress.Commands.add("createUser", createUser);
