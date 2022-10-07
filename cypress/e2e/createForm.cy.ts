/// <reference types="cypress"/>

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/publish-car-form");
  });
  it("should pick models based on brand", () => {
    cy.getSelectByName("brand_id").select("BMW");
    cy.getSelectByName("model_id").select("M4");
    cy.getSelectByName("model_id").should("have.value", 24);
  });
  it("should pick models based on brand", () => {
    cy.getSelectByName("brand_id").select("BMW");
    cy.getSelectByName("model_id").select("M4");
    cy.getSelectByName("model_id").should("have.value", 24);
  });
  it("should show toast notification when mutation return error", () => {
    cy.getSelectByName("brand_id").select("Ford");
    cy.getSelectByName("model_id").select("Maverick");
    cy.getSelectByName("city_id").select("Orlando");
    cy.get("input[name='vin']").type("MX5432");
    cy.getSelectByName("color_id").select("White");
    // line below changing range but not label
    cy.get("input[name='odometer']").invoke("val", 150000).trigger("change");
    cy.get("input[value='N']").click();
    cy.get("input[name='sale_date']").type("2022-12-25");
    cy.get("input[name='price']").type("32500");
    cy.contains(/publish car now/i).click();
    cy.contains(
      "Car could not be published, you may have already added this car."
    ).should("be.visible");
  });
});
