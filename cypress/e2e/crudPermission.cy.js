/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const delay = function () {
    cy.wait(200);
}

describe('superadmin can do CRUD on user list', () => {

    before(() => {
        cy.exec('php artisan migrate:fresh --seed');
        
    });

    beforeEach(() => {
        cy.visit('http://127.0.0.1:8000');
        cy.get(':nth-child(2) > .form-control').type('superadmin@gmail.com');
        delay();
        cy.get(':nth-child(3) > .form-control').type('password');
        delay();
        cy.get('.btn').click();
        delay();
        cy.get('.navbar-nav > :nth-child(1) > .nav-link > .fas').click();
        delay();
        cy.get(':nth-child(3) > .has-dropdown').click();
        delay();
        cy.get('.active > .dropdown-menu > :nth-child(2) > .nav-link').click();
        delay();
    });



    it('create', () => {
        cy.get('.card-header-action > .btn-icon').click();
        delay();
        cy.get('h4').should('have.text','Create Permission Form');
        delay();
        cy.get('#name').type('permission2.create');
        delay();
        cy.get('#guard_name').type('web');
        delay();
        cy.get('.btn-primary').click();
        delay();
        cy.get('p').should('have.text', 'Permission Created Successfully');
        delay();

    });

    it('edit', () => {
        cy.get(':nth-child(5) > .page-link').click();
        delay();
  
        cy.get(':nth-child(9) > .text-right > .d-flex > .btn-info').click();
        // cy.get('#h4').should('have.text','Permission Edit Form');
        delay();
        cy.get('#name').clear().type('permission5.edit');
        delay();
        cy.get('#guard_name').clear().type('web');
        delay();
        cy.get('.btn-primary').click();
        delay();
        cy.get('p').should('have.text', 'Permission Updated Successfully');
    });

    it('delete', () => {
        cy.get(':nth-child(5) > .page-link').click();
        delay();
       cy.get(':nth-child(9) > .text-right > .d-flex > .ml-2 > .btn').click();
        delay();
        // cy.get('.table-row').should('not.have.length', 3);
        // delay();
        cy.get('p').should('have.text', 'Permission Deleted Successfully');
        delay();
        // cy.get('.table > tbody > tr').should('have.length', 3);
        // delay();
        // cy.get('.card-body').contains('Noora Aulia Hidayat').should('not.exist');
        // delay();
        // cy.get('.card-body').contains('noora@gmail.com').should('not.exist');
        // delay();
    });

});