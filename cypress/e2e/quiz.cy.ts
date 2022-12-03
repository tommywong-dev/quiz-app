import { COOKIE_KEY } from "../../constants";
import { INPUT, MOCK_USER, URL } from "../test-constants";
import t from "../../locales/en.json";

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
    cy.clearCookie(COOKIE_KEY.USER);
    cy.visit(URL.BASE);
    cy.visit(URL.BASE);
    cy.get(INPUT.NAME).type(MOCK_USER.name);
    cy.get(INPUT.EMAIL).type(MOCK_USER.email);
    cy.get(INPUT.BUTTON).click();
    Cypress.Cookies.preserveOnce(COOKIE_KEY.USER);
  });

  it("should close alert when clicked 'no'", () => {
    cy.get("#exit-btn").click();
    cy.get("#alert-cancel-btn").click();
    cy.url().should("equal", URL.QUIZ);
  });

  it("should exit quiz when clicked 'yes'", () => {
    cy.get("#exit-btn").click();
    cy.get("#alert-confirm-btn").click();
    cy.url().should("equal", URL.BASE);
  });
});
