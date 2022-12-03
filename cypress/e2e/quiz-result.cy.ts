import { COOKIE_KEY } from "../../constants";
import { mockQuizzes } from "../../mocks";
import { BUTTON, URL } from "../test-constants";
import t from "../../locales/en.json";

describe("Test quiz result", () => {
  before(() => {
    cy.enterQuiz();
  });

  it("should throw when navigate '/quiz/result' without finishing quiz", () => {
    cy.clearCookie(COOKIE_KEY.ANSWERS);
    cy.visit(URL.QUIZ_RESULT);
    cy.url().should("equal", URL.QUIZ + "/0");

    cy.get(".chakra-alert").should("exist");
  });

  it("should dismiss error toast when clicked 'x'", () => {
    cy.get(".chakra-alert > button").click();
    cy.get(".chakra-alert").should("not.exist");
  });

  it("should show passed when finished with correct answers", () => {
    cy.clearCookie(COOKIE_KEY.ANSWERS);
    const correctAnswers: string[] = mockQuizzes.reduce((prev, curr) => {
      const answer = curr.correctAnswer || "1";
      return [...prev, answer];
    }, [] as string[]);
    cy.setCookie(COOKIE_KEY.ANSWERS, JSON.stringify(correctAnswers));

    cy.visit(URL.QUIZ_RESULT);
    cy.url().should("equal", URL.QUIZ_RESULT);
    cy.get("#result-title")
      .first()
      .should("contain.text", t.quiz.result.passed.title);
  });

  it("should show failed when finished with wrong answers", () => {
    cy.clearCookie(COOKIE_KEY.ANSWERS);
    const wrongAnwers: string[] = ["1", "1", "1", "1", "1"];
    cy.setCookie(COOKIE_KEY.ANSWERS, JSON.stringify(wrongAnwers));

    cy.visit(URL.QUIZ_RESULT);
    cy.url().should("equal", URL.QUIZ_RESULT);
    cy.get("#result-title")
      .first()
      .should("contain.text", t.quiz.result.failed.title);
  });

  it("should restart the quiz when clicked 'restart'", () => {
    cy.get(BUTTON.RESTART_BTN).click();
    cy.url().should("equal", URL.QUIZ);
    cy.getCookie(COOKIE_KEY.ANSWERS).should("not.exist");
  });
});
