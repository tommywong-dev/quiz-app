import { IUser } from "../../interfaces";
import t from "../../locales/en.json";

describe("Test Enter Quiz", () => {
  const BASE_URL = "http://localhost:3000";
  const INPUT = {
    NAME: "input[name='name']",
    EMAIL: "input[name='email']",
    BUTTON: "button[type='submit']",
  };
  const MOCK_USER: IUser = {
    name: "Anonymous",
    email: "anonymous@gmail.com",
  };
  const MOCK_INVALID_USER: IUser = {
    name: "AnonymousAnonymousAnonymousAnonymousAnonymousAnonymous",
    email: "anonymousanonymousanonymousanonymousanonymous@gmail.com",
  };

  it("enters quiz normally", () => {
    cy.visit(BASE_URL);
    cy.get(INPUT.NAME).type(MOCK_USER.name);
    cy.get(INPUT.EMAIL).type(MOCK_USER.email);
    cy.get(INPUT.BUTTON).click();
    cy.url().should("contain", `${BASE_URL}/quiz`);
  });

  it("enters quiz without name", () => {
    cy.visit(BASE_URL);
    cy.get(INPUT.NAME).click();
    cy.get(INPUT.EMAIL).type(MOCK_USER.email);
    cy.contains(t.form.name.required);
    cy.url().should("contain", BASE_URL);
  });

  it("enters quiz without email", () => {
    cy.visit(BASE_URL);
    cy.get(INPUT.EMAIL).click();
    cy.get(INPUT.NAME).type(MOCK_USER.name);
    cy.contains(t.form.email.required);
    cy.url().should("contain", BASE_URL);
  });

  it("enters quiz with short name", () => {
    cy.visit(BASE_URL);
    cy.get(INPUT.NAME).type(MOCK_USER.name.substr(0, 1));
    cy.get(INPUT.EMAIL).focus();
    cy.contains(t.form.name.tooShort);
  });

  it("enters quiz with short email", () => {
    cy.visit(BASE_URL);
    cy.get(INPUT.EMAIL).type(MOCK_USER.email.substr(0, 3));
    cy.get(INPUT.NAME).focus();
    cy.contains(t.form.email.tooShort);
  });

  it("enters quiz with long name", () => {
    cy.visit(BASE_URL);
    cy.get(INPUT.NAME).type(MOCK_INVALID_USER.name);
    cy.get(INPUT.EMAIL).focus();
    cy.contains(t.form.name.tooLong);
  });

  it("enters quiz with long email", () => {
    cy.visit(BASE_URL);
    cy.get(INPUT.EMAIL).type(MOCK_INVALID_USER.email);
    cy.get(INPUT.NAME).focus();
    cy.contains(t.form.email.tooLong);
  });

  it("enters quiz with invalid email", () => {
    cy.visit(BASE_URL);
    cy.get(INPUT.EMAIL).type(MOCK_USER.name);
    cy.get(INPUT.NAME).focus();
    cy.contains(t.form.email.invalid);
  });
});
