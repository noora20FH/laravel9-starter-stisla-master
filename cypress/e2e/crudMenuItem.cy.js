/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
// const delay = function () {
//   cy.wait(200);
// }

describe('login and open dashboard', () => {

  beforeEach(() => {
    cy.visit('http://127.0.0.1:8000');
    cy.get(':nth-child(2) > .form-control').type('superadmin@gmail.com');
    
    cy.get(':nth-child(3) > .form-control').type('password');
    ;
    cy.get('.btn').click();
    cy.get('.navbar-nav > :nth-child(1) > .nav-link > .fas').click();
    
    cy.get(':nth-child(4) > .has-dropdown > .fas').click();
    cy.visit('http://127.0.0.1:8000/menu-management/menu-item');
    

    
});

    it('Login', () => {
      cy.visit('http://127.0.0.1:8000/')

      //See this text
      cy.get('h4').should("have.text", "Login");
      cy.get(':nth-child(2) > label').should("have.text", "Email");
      cy.get('.control-label').should("have.text", "Password");
      cy.get('.btn').should("be.enabled").contains("Login");

  

      })

    
      it('CREATE MENU ITEMS', () => {
        //Can see menu item page
        cy.visit('http://127.0.0.1:8000/menu-management/menu-item');

        //Enter Create menu Item
        cy.get('.card-header-action > .btn-icon').click();
        cy.get('h1').should("have.text", "Menu Group and Menu Item");
        cy.get('.section-title').should("have.text", "Menu Item Management");
        cy.get('h4').should("have.text", "Menu Item Create Form");
        cy.get(':nth-child(2) > label').should("have.text", "Parent");
        cy.get(':nth-child(3) > label').should("have.text", "Menu Item Name");
        cy.get(':nth-child(4) > label').should("have.text", "Permission Name");
        cy.get(':nth-child(5) > label').should("have.text", "route");
        // cy.get('#select2-menu_group_id-2d-result-8bm1-1').click();
        cy.get('#name').type("Password Management");
        cy.get('#permission_name').type("Profile");
        
        cy.get(':nth-child(2) > .select2-container > .selection > .select2-selection > .select2-selection__arrow').type('Dashboard')

        cy.get('.select2-results__option--highlighted').click();


        cy.get(':nth-child(5) > .select2-container > .selection > .select2-selection > .select2-selection__arrow').type("forgot-password");
        // select2-results__option select2-results__option--highlighted
        cy.get('.select2-results__option--highlighted').click();

        cy.get('.btn-primary').click({ force: true });


        //already added
        cy.visit('http://127.0.0.1:8000/menu-management/menu-item')
        cy.get(':nth-child(3) > .text-right > .d-flex > .btn-info').click({ force: true });

      })

      it('EDIT MENU ITEMS', () => {
              // Edit
              cy.get(':nth-child(10) > .text-right > .d-flex > .btn-info').click();
       cy.get('#name').clear().type('menu item 2');
       cy.get('.btn-primary').click({ force: true });
       cy.get('p').should('have.text', 'Data berhasil diubah')
      })

      it('DELETE MENU ITEMS', () => {
       //delete

       cy.get(':nth-child(10) > .text-right > .d-flex > .ml-2 > .btn').click();
      cy.get('p').should('have.text', 'Data berhasil dihapus');

      })


  })