import "./login";

Cypress.Commands.add("visitStubbed", (url, operations = {}) => {
  function responseStub(result) {
    return {
      json() {
        return Promise.resolve(result);
      },
      text() {
        return Promise.resolve(JSON.stringify(result));
      },
      ok: true
    };
  }

  function serverStub(path, req) {
    const { operationName } = JSON.parse(req.body);

    if (Object.keys(operations).indexOf(operationName) !== false) {
      return Promise.resolve(responseStub(operations[operationName]));
    }

    return Promise.reject(new Error(`Not found: ${path}`));
  }

  cy.visit(url, {
    onBeforeLoad: win => {
      cy.stub(win, "fetch")
        .callsFake(serverStub)
        .as("fetch stub");
    }
  });
});
