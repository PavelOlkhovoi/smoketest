describe("Smoke test", () => {
  it("Load all sources", () => {
    cy.visit(
      "https://topicmaps-wuppertal.github.io/stadtplan/#/?lat=51.25597263790461&lng=7.191198646368561&zoom=8"
    );

    cy.get(".leaflet-marker-icon").then(($icon) => {
      cy.wrap($icon).should("have.length.greaterThan", 100);
    });

    // cy.get(".leaflet-marker-icon", { timeout: 190000 }).should(
    //   "have.length.greaterThan",
    //   100
    // );

    cy.get(".leaflet-marker-icon").first().click();
    cy.url().should("include", "&zoom=9");
  });

  it.only("Test with resource utilization limitation", () => {
    cy.intercept("GET", "**/*").as("getAllGetRequests");

    cy.visit(
      "https://topicmaps-wuppertal.github.io/stadtplan/#/?lat=51.25597263790461&lng=7.191198646368561&zoom=8"
    );

    // Ожидаем завершения всех GET-запросов, максимум 30 секунд
    cy.wait("@getAllGetRequests");

    cy.get(".leaflet-marker-icon").then(($icon) => {
      cy.wrap($icon).should("have.length.greaterThan", 100);
    });

    // cy.get(".leaflet-marker-icon", { timeout: 190000 }).should(
    //   "have.length.greaterThan",
    //   100
    // );
  });

  // it("Test links that lead to new sites", () => {
  //   cy.visit(
  //     "https://topicmaps-wuppertal.github.io/stadtplan/#/?lat=51.25597263790461&lng=7.191198646368561&zoom=8"
  //   );

  //   cy.get("#cmdShowModalApplicationMenu").should("be.visible").click();

  //   cy.get(".modal-content", { timeout: 10000 }).should("be.visible");

  //   // cy.screenshot();

  //   cy.get("#cmdCloseModalApplicationMenu").click({ force: true });

  //   cy.get(".leaflet-marker-icon", { timeout: 190000 }).should(
  //     "have.length.greaterThan",
  //     100
  //   );

  //   cy.get(".leaflet-marker-icon").first().click();

  //   cy.url().should("include", "&zoom=9");
  //   cy.url().then((url) => {
  //     console.log("Current URL:", url);
  //   });
  // });
});
