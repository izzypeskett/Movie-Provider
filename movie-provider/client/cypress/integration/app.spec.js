describe("App component errors", () => {
  it("Return 404 page when url is not defined", () => {
    cy.visit("/wrong");

    cy.contains(/wrong page/i);
  });
});
