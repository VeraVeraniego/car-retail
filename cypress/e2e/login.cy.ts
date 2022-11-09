/// <reference types="cypress"/>

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("Login button should enable on typing", () => {
    cy.contains(/login/i).should("be.disabled");
    cy.getByPlaceholder("Email").type("Test Email in Wrong Format");
    cy.contains(/login/i).should("be.enabled");
  });
  it("should show case when invalid email", () => {
    cy.getByPlaceholder("Email").type("Test Email in Wrong Format");
    cy.contains(/login/i).click();
    cy.contains(/invalid email/i).should("be.visible");
  });
  it("should show case when unauthorized user", () => {
    cy.getByPlaceholder("Email").type("unauthorized@test.com");
    cy.contains(/login/i).click();

    cy.contains(/not allowed/i).should("be.visible");
  });
  it("should navigate to home when authorized", () => {
    cy.getByPlaceholder("Email").type("test@example.com");
    cy.contains(/login/i).click();
    cy.contains(/login/i).should("not.exist");
    cy.contains("Cool Cars are waiting for you").should("be.visible");
  });
});
