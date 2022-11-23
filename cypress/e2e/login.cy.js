/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('No.  5- User is Login then can see User List then logout', () => {
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
        cy.get('tbody > :nth-child(2) > :nth-child(4)').should("have.text", "19 October 2022");
        cy.get('tbody > :nth-child(1) > .text-right').should("have.text", "Action");
        cy.get(':nth-child(2) > .text-right').contains("Edit");
        cy.get(':nth-child(2) > .text-right').contains("Delete");

        // //Logout from website
        // cy.get('.navbar-right > :nth-child(2) > .nav-link').click({ force: true });
        // cy.get('.text-danger').click({ force: true });

        cy.get('.navbar-nav > :nth-child(1) > .nav-link > .fas').click();
        cy.get(':nth-child(4) > .has-dropdown > span').click();
        cy.get('.active > .dropdown-menu > :nth-child(2) > .nav-link').click();
        cy.get('.section-title').should("have.text", "Menu Item Management");
        cy.get('h4').should("have.text", "Menu Item List");
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should("have.text", "Parent");
        cy.get('tbody > :nth-child(1) > :nth-child(3)').should("have.text", "Name");
        cy.get('tbody > :nth-child(1) > :nth-child(4)').should("have.text", "Url");
        cy.get('tbody > :nth-child(1) > :nth-child(5)').should("have.text", "Permission");
        cy.get('tbody > :nth-child(1) > .text-right').should("have.text", "Action");
        cy.get('.card-header-action > .btn-icon').click();
        //Menu Item Create Form
        cy.get('.section-title').should("have.text", "Menu Item Management");
        cy.get('h4').should("have.text", "Menu Item Create Form");
        cy.get(':nth-child(2) > label').should("have.text", "Parent");
        cy.get(':nth-child(3) > label').should("have.text", "Menu Item Name");
        cy.get(':nth-child(4) > label').should("have.text", "Permission Name");
        cy.get(':nth-child(5) > label').should("have.text", "Url");

        cy.get(':nth-child(5) > label').should("have.text", "Url");
        
        
        // cy.get(':nth-child(2) > .form-control').type("superadmin@gmail.com");
        // cy.get(':nth-child(3) > .form-control').type("password");
        // cy.get('.btn').click({ force: true });

        




    })
    
    it('create new menu item', () => {
        cy.visit('http://127.0.0.1:8000/menu-management/menu-item/create');

        //Menu Item Create Form
        cy.get('.section-title').should("have.text", "Menu Item Management");
        cy.get('h4').should("have.text", "Menu Item Create Form");
        cy.get(':nth-child(2) > label').should("have.text", "Parent");
        cy.get(':nth-child(3) > label').should("have.text", "Menu Item Name");
        cy.get(':nth-child(4) > label').should("have.text", "Permission Name");
        cy.get(':nth-child(5) > label').should("have.text", "Url");

        cy.get(':nth-child(5) > label').should("have.text", "Url");
        cy.get('#select2-menu_group_id-v9-container').select('Dashboard').should('have.value','1');
        // cy.get('#select2-menu_group_id-av-result-a3ly-1').click();
        // cy.get('#select2-menu_group_id-1n-container').should("have.text", "Dashboard");
        cy.get('#name').type("menu item2");
        cy.get('#permission_name').type("menu item2");

      })

})

  