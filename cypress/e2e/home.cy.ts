import { COOKIE_KEY } from "../../constants";
import t from "../../locales/en.json";
import { INPUT, MOCK_INVALID_USER, MOCK_USER, URL } from "../test-constants";

describe("Test Home Form", () => {
  beforeEach(() => {
    cy.visit(URL.BASE);
  });

  it("should throw when enter without name", () => {
    cy.visit(URL.BASE);
    cy.get(INPUT.NAME).click();
    cy.get(INPUT.EMAIL).type(MOCK_USER.email);
    cy.contains(t.form.name.required);
    cy.url().should("contain", URL.BASE);
  });

  it("should throw when enter without email", () => {
    cy.visit(URL.BASE);
    cy.get(INPUT.EMAIL).click();
    cy.get(INPUT.NAME).type(MOCK_USER.name);
    cy.contains(t.form.email.required);
    cy.url().should("contain", URL.BASE);
  });

  it("should throw when enter with short name", () => {
    cy.visit(URL.BASE);
    cy.get(INPUT.NAME).type(MOCK_USER.name.substr(0, 1));
    cy.get(INPUT.EMAIL).focus();
    cy.contains(t.form.name.tooShort);
  });

  it("should throw when enter with short email", () => {
    cy.visit(URL.BASE);
    cy.get(INPUT.EMAIL).type(MOCK_USER.email.substr(0, 3));
    cy.get(INPUT.NAME).focus();
    cy.contains(t.form.email.tooShort);
  });

  it("should throw when enter with long name", () => {
    cy.visit(URL.BASE);
    cy.get(INPUT.NAME).type(MOCK_INVALID_USER.name);
    cy.get(INPUT.EMAIL).focus();
    cy.contains(t.form.name.tooLong);
  });

  it("should throw when enter with long email", () => {
    cy.visit(URL.BASE);
    cy.get(INPUT.EMAIL).type(MOCK_INVALID_USER.email);
    cy.get(INPUT.NAME).focus();
    cy.contains(t.form.email.tooLong);
  });

  it("should throw when enter with invalid email", () => {
    cy.visit(URL.BASE);
    cy.get(INPUT.EMAIL).type(MOCK_USER.name);
    cy.get(INPUT.NAME).focus();
    cy.contains(t.form.email.invalid);
  });

  describe("Test entering quiz", () => {
    it("should enter when input valid data", () => {
      cy.get(INPUT.NAME).type(MOCK_USER.name);
      cy.get(INPUT.EMAIL).type(MOCK_USER.email);
      cy.get(INPUT.BUTTON).click();
      cy.url().should("contain", URL.QUIZ);
      Cypress.Cookies.preserveOnce(COOKIE_KEY.USER);
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
});
