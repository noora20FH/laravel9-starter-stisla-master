/// <reference types="cypress" />

describe('Question No.2 - User is Login then can see User List then logout', () => {
    it('Login First!', () => {
        cy.visit('http://127.0.0.1:8000/')

        //See this text
        cy.get('h4').should("have.text", "Login");
        cy.get(':nth-child(2) > label').should("have.text", "Email");
        cy.get('.control-label').should("have.text", "Password");
        cy.get('.btn').should("be.enabled").contains("Login");

        //User can login
        cy.get(':nth-child(2) > .form-control').type("superadmin@gmail.com");
        cy.get(':nth-child(3) > .form-control').type("password");
        cy.get('.btn').click({ force: true });

        //Can see user list page
        cy.visit('http://127.0.0.1:8000/user-management/user');
        cy.get('h1').should("have.text", "User List");
        cy.get('.section-title').should("have.text", "User Management");
        cy.get('.table > tbody > :nth-child(1) > :nth-child(1)').should("have.text", "#");
        cy.get('.table > tbody > :nth-child(2) > :nth-child(1)').should("have.text", "1");
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should("have.text", "Name");
        cy.get('.table > tbody > :nth-child(2) > :nth-child(2)').should("have.text", "SuperAdmin");
        cy.get('tbody > :nth-child(1) > :nth-child(3)').should("have.text", "Email");
        cy.get('tbody > :nth-child(2) > :nth-child(3)').should("have.text", "superadmin@gmail.com");
        cy.get('tbody > :nth-child(1) > :nth-child(4)').should("have.text", "Created At");
        // cy.get('tbody > :nth-child(2) > :nth-child(4)').should("have.text", "19 October 2022");
        cy.get('tbody > :nth-child(1) > .text-right').should("have.text", "Action");
        cy.get(':nth-child(2) > .text-right').contains("Edit");
        cy.get(':nth-child(2) > .text-right').contains("Delete");

        //Logout from website
        cy.get('.navbar-right > :nth-child(2) > .nav-link').click({ force: true });
        cy.get('.text-danger').click({ force: true });
    })
})