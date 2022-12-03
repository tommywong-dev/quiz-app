// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { COOKIE_KEY } from "../../constants";
import { INPUT, MOCK_USER, URL } from "../test-constants";
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Commands.add("enterQuiz", () => {
  cy.clearCookie(COOKIE_KEY.USER);
  cy.visit(URL.BASE);
  cy.visit(URL.BASE);
  cy.get(INPUT.NAME).type(MOCK_USER.name);
  cy.get(INPUT.EMAIL).type(MOCK_USER.email);
  cy.get(INPUT.SUBMIT_BUTTON).click();
  Cypress.Cookies.defaults({
    preserve: [COOKIE_KEY.USER, COOKIE_KEY.ANSWERS, COOKIE_KEY.ERROR],
  });
});
