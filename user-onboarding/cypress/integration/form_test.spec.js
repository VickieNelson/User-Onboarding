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

//validation if field is empty

describe("Form validation", () => {
  it("validates if form is empty", () => {
    // need to navigate to site again first
    // assert that there are no validation error to start with
    // type a single char in the username input
    // assert there IS a validation error
    cy.visit("http://localhost:3000");

    cy.get(".input").invoke("val").should("contain", "");
  });
});
