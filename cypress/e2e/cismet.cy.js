Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("First cismet test", () => {
  it("Test links that lead to new sites", () => {
    cy.visit("https://www.cismet.de/");
    cy.get("a:visible[target='new']").each((link) => {
      cy.wrap(link).then((link) => {
        cy.request({
          url: link.prop("href"),
          failOnStatusCode: false,
        }).then((response) => {
          if (response.status === 404) {
            cy.log(`Link ${link.prop("href")} leads to a 404 page.`);
          } else {
            cy.log(`Link ${link.prop("href")} is valid.`);
          }
        });
      });
    });
  });

  it("Test Projects Links", () => {
    const logs = [];

    cy.visit("https://www.cismet.de/");

    cy.get(".mosaic-block, .mosaic-block-half")
      .each(($mosaic, index, list) => {
        cy.wrap($mosaic).find("a[data-toggle='modal']").click();

        cy.get(".modal").should("be.visible");

        cy.get(".modal-body a:visible[target='_new']").each(
          (link, linkIndex, linkList) => {
            cy.wrap(link).then((link) => {
              const isLastLink = index === list.length - 1;

              if (!isLastLink) {
                cy.request({
                  url: link.prop("href"),
                  failOnStatusCode: false,
                  timeout: 60000,
                }).then((response) => {
                  const logMessage =
                    response.status === 404
                      ? `Link ${link.prop("href")} leads to a 404 page.`
                      : `Link ${link.prop("href")} is valid.`;

                  // Log to console
                  cy.log(logMessage);

                  // Store logs in the array
                  logs.push(logMessage);
                });
              }
            });
          }
        );

        cy.get(".close:visible").should("be.visible");
        cy.get(".close:visible").click();

        cy.get(".modal").should("not.be.visible");
      })
      .then(() => {
        cy.writeFile("logs.txt", logs.join("\n"));
      });
  });
});
