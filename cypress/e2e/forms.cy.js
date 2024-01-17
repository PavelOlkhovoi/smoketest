describe("Form test", () => {
  beforeEach(() => {
    cy.visit("/forms");
  });

  it("Test subscribe form", () => {
    cy.contains(/testing forms/i);
    cy.getDataTest("subscribe-form").find("input").as("subscribe-input");
    // cy.get("@subscribe-input").type("ryan@coderyaen.com");
    // cy.getDataTest("subscribe-form").find("input").type("ryan@coderyaen.com");
    cy.get("@subscribe-input").type("ryan@coderyaen.com");
    cy.contains(/Successfully subbed: ryan@coderyaen.com!/i).should(
      "not.exist"
    );
    cy.getDataTest("subscribe-button").click();
    cy.contains(/Successfully subbed: ryan@coderyaen.com!/i).should("exist");
    cy.wait(3000);
    cy.contains(/Successfully subbed: ryan@coderyaen.com!/i).should(
      "not.exist"
    );

    cy.get("@subscribe-input").type("ryan@coderyaen.io");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/invalid email: ryan@coderyaen.io!/i).should("exist");

    cy.wait(3000);
    cy.contains(/invalid email: ryan@coderyaen.io!/i).should("not.exist");

    cy.contains(/invalid email: !/i).should("not.exist");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/invalid email: !/i).should("exist");
  });
});
