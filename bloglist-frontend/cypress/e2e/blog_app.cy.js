/* eslint-disable no-undef */
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");

    const user = {
      name: "Matti Luukkainen",
      username: "root",
      password: "password",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Super Cool Blogs");
  });

  it("login form can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Login").click();
  });

  it("user can login", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Login").click();
    cy.get("input#username").type("root");
    cy.get("input#password").type("password");
    cy.get("#login-button").click();

    cy.contains("Hello, root!");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3000");
      cy.contains("Login").click();
      cy.get("input#username").type("root");
      cy.get("input#password").type("password");
      cy.get("#login-button").click();
    });

    it("a new blog can be created", function () {
      cy.contains("New Blog").click();
      cy.get("input#title").type("Title");
      cy.get("input#author").type("Author");
      cy.get("input#url").type("URL");
      cy.get("button#add-blog").click();
      cy.contains("Title");
    });

    it("a new blog can be liked", function () {
      cy.contains("New Blog").click();
      cy.get("input#title").type("Title");
      cy.get("input#author").type("Author");
      cy.get("input#url").type("URL");
      cy.get("button#add-blog").click();
      cy.contains("Title");
      cy.contains("show").click();
      cy.contains("Likes: 0");
      cy.contains("Like").click();
      cy.contains("Likes: 1");
    });

    it("a new blog can be liked", function () {
      cy.contains("New Blog").click();
      cy.get("input#title").type("Title");
      cy.get("input#author").type("Author");
      cy.get("input#url").type("URL");
      cy.get("button#add-blog").click();
      cy.contains("Title");
    });
  });

  it("login fails with wrong password", function () {
    cy.contains("Login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.contains("invalid username or password");
  });
});
