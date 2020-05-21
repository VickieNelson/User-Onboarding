describe("Form inputs", () => {
  it("can navigate to the site", () => {
    cy.visit("http://localhost:3000");
    cy.url().should("include", "localhost");
  });

  it("button is disabled", () => {
    cy.get("button").should("be.disabled");
  });

  it("can type a username", () => {
    cy.get('input[name="name"]')
      .type("Lady Gaga")
      .should("have.value", "Lady Gaga");
  });
  it("can type an email", () => {
    cy.get('input[name="email"]')
      .type("vickie@vickie.com")
      .should("have.value", "vickie@vickie.com");
  });
  it("can select a role", () => {
    cy.get('select[name="role"]')
      .select("Student")
      .should("have.value", "student");
  });

  it("submit button not disabled any more", () => {
    cy.get("button.submit").should("not.be.disabled");
  });

  it("checkbox can be checked", () => {
    cy.get(".terms input").should("not.be.disabled");
  });
});
