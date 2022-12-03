import { COOKIE_KEY } from "../../constants";
import { INPUT, MOCK_USER, URL } from "../test-constants";
import "./commands";

Cypress.Commands.add("enterQuiz", () => {
  cy.clearCookie(COOKIE_KEY.USER);
  cy.visit(URL.BASE);
  cy.visit(URL.BASE);
  cy.get(INPUT.NAME).type(MOCK_USER.name);
  cy.get(INPUT.EMAIL).type(MOCK_USER.email);
  cy.get(INPUT.SUBMIT_BUTTON).click();
});

Cypress.Cookies.defaults({
  preserve: [COOKIE_KEY.USER, COOKIE_KEY.ANSWERS, COOKIE_KEY.ERROR],
});

declare global {
  namespace Cypress {
    interface Chainable {
      enterQuiz(): Chainable;
    }
  }
}
