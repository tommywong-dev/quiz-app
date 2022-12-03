import { COOKIE_KEY } from "../../constants";
import { mockQuizzes } from "../../mocks";
import { BUTTON, INPUT, URL } from "../test-constants";

describe.only("Test start quiz", () => {
  before(() => {
    cy.enterQuiz();
  });

  describe("Test '/quiz/0'", () => {
    const FIRST_QUIZ = mockQuizzes[0];
    const FIRST_ANSWER = FIRST_QUIZ.answers[0];

    it("should enter '/quiz/0' when clicked 'enter'", () => {
      cy.get(BUTTON.START_BTN).click();
      cy.url().should("equal", URL.QUIZ + "/0");
    });

    it("should disable 'next' button on first visit", () => {
      cy.get(BUTTON.NEXT_BTN).should("be.disabled");
    });

    it("should not have 'back' button on '/quiz/0' page", () => {
      cy.get(BUTTON.BACK_BTN).should("not.exist");
    });

    it("should check answer and enable 'next' button when selected answer", () => {
      cy.get(INPUT.RADIO).check(FIRST_ANSWER.value, {
        force: true,
      });
      cy.get(INPUT.RADIO).first().parent().should("have.attr", "data-checked");
      cy.get(BUTTON.NEXT_BTN).should("be.enabled");
    });

    it("should disable answers and 'next' button when clicked 'next'", () => {
      cy.get(BUTTON.NEXT_BTN).click();
      cy.get(BUTTON.NEXT_BTN).should("be.disabled");
      cy.get(INPUT.RADIO).first().should("be.disabled");
    });

    it("should have stored answers in cookie", () => {
      cy.getCookie(COOKIE_KEY.ANSWERS).should(
        "have.a.property",
        "name",
        COOKIE_KEY.ANSWERS
      );
      cy.getCookie(COOKIE_KEY.ANSWERS).should(
        "have.a.property",
        "value",
        encodeURIComponent(JSON.stringify([FIRST_ANSWER.value]))
      );
    });

    it("should go to next question '/quiz/1' when clicked 'next'", () => {
      cy.url().should("equal", URL.QUIZ + "/1");
    });
  });

  describe("Test '/quiz/1'", () => {
    it("should disable 'next' button on first visit", () => {
      cy.get(BUTTON.NEXT_BTN).should("be.disabled");
    });

    it("should have 'back' button on '/quiz/1' page", () => {
      cy.get(BUTTON.BACK_BTN).should("exist");
    });

    it("should go to '/quiz/0' page when clicked 'back'", () => {
      cy.get(BUTTON.BACK_BTN).click();
      cy.url().should("equal", URL.QUIZ + "/0");
    });
  });
});
