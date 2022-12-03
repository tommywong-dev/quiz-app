import { COOKIE_KEY } from "../../constants";
import { BUTTON, URL } from "../test-constants";

describe("Test entering quiz without authentication", () => {
  before(() => {
    cy.clearCookie(COOKIE_KEY.USER);
    cy.visit(URL.BASE);
  });

  it("should redirect to '/' when navigate '/quiz' without authentication", () => {
    cy.visit(URL.QUIZ);
    cy.url().should("equal", URL.BASE);
  });

  it("should redirect to '/' when navigate '/quiz/[id]' without authentication", () => {
    cy.visit(URL.QUIZ + "/1");
    cy.url().should("equal", URL.BASE);
  });

  it("should redirect to '/' when navigate '/quiz/result' without authentication", () => {
    cy.visit(URL.QUIZ + "/result");
    cy.url().should("equal", URL.BASE);
  });
});

describe("Test after entering quiz", () => {
  before(() => {
    cy.enterQuiz();
  });

  it("should close alert when clicked 'no'", () => {
    cy.get(BUTTON.EXIT_BTN).click();
    cy.get(BUTTON.ALERT_CANCEL_BTN).click();
    cy.url().should("equal", URL.QUIZ);
  });

  it("should exit quiz when clicked 'yes'", () => {
    cy.get(BUTTON.EXIT_BTN).click();
    cy.get(BUTTON.ALERT_CONFIRM_BTN).click();
    cy.url().should("equal", URL.BASE);
  });
});
