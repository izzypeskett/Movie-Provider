describe("End to end test", () => {
  it("clicks the movie card and renders movie", () => {
    cy.visit("/");

    if (cy.contains(/classic movies/i)) {
      cy.contains("Star Wars: Episode VII - The Force Awakens").click();

      cy.url().should("include", "/movie/0");
      // Checking if the prices have been rendered
      cy.get(".display__content").contains(
        "Star Wars: Episode VII - The Force Awakens"
      );

      cy.get(".btn").click();
      cy.contains(/classic movies/i);
    } else {
      cy.contains(/server/i);
    }
  });
});
