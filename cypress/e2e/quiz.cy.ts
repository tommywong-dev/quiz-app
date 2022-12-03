import { COOKIE_KEY } from "../../constants";
import { INPUT, MOCK_USER, URL } from "../test-constants";

describe("Test Entering Quiz without authentication", () => {
  const WAIT_TIME = 1000;

  it("should redirect to '/' when navigate '/quiz' without authentication", () => {
    cy.visit(URL.QUIZ);
    cy.wait(WAIT_TIME).url().should("equal", URL.BASE);
  });

  it("should redirect to '/' when navigate '/quiz/[id]' without authentication", () => {
    cy.visit(URL.QUIZ + "/1");
    cy.wait(WAIT_TIME).url().should("equal", URL.BASE);
  });

  it("should redirect to '/' when navigate '/quiz/result' without authentication", () => {
    cy.visit(URL.QUIZ + "/result");
    cy.wait(WAIT_TIME).url().should("equal", URL.BASE);
  });
});

describe.only("Test entering quiz", () => {
  before(() => {
    cy.visit(URL.BASE);
    cy.get(INPUT.NAME).type(MOCK_USER.name);
    cy.get(INPUT.EMAIL).type(MOCK_USER.email);
    cy.get(INPUT.BUTTON).click();
    Cypress.Cookies.defaults({
      preserve: COOKIE_KEY.USER,
    });
  });

  it("should enter quiz page when enter valid name and email", () => {
    cy.url().should("equal", URL.QUIZ);
  });

  it("should have correct user coookie stored when enter quiz page", () => {
    cy.getCookie(COOKIE_KEY.USER).should(
      "have.a.property",
      "name",
      COOKIE_KEY.USER
    );
    cy.getCookie(COOKIE_KEY.USER).should(
      "have.a.property",
      "value",
      encodeURIComponent(JSON.stringify(MOCK_USER))
    );
  });
});
