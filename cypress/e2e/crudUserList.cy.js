/// <reference types="cypress" />

// testing cycle => login -> read -> create user -> edit user -> delete user -> logout
// cy.get(':nth-child(4) > .has-dropdown > .fas')
//
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
        cy.get(':nth-child(2) > .has-dropdown > span').click();
        delay();
        cy.get('.active > .dropdown-menu > li > .nav-link').click();
        delay();
    });

    it('read', () => {
        cy.get('.nav-link > .d-sm-none').should('have.text', 'Hi, SuperAdmin');
        delay();
        cy.get('.table > tbody > :nth-child(2) > :nth-child(2)').should('have.text', 'SuperAdmin');
        delay();
        cy.get('tbody > :nth-child(2) > :nth-child(3)').should('have.text', 'superadmin@gmail.com');
        delay();
        // cy.get('tbody > :nth-child(2) > :nth-child(4)').should('have.text', '3 November 2022');
        delay();
        cy.get('.table > tbody > :nth-child(3) > :nth-child(2)').should('have.text', 'user');
        delay();
        cy.get('tbody > :nth-child(3) > :nth-child(3)').should('have.text', 'user@gmail.com');
        delay();
        // cy.get('tbody > :nth-child(3) > :nth-child(4)').should('have.text', '3 November 2022');
        delay();
    });

    it('create', () => {
        cy.get('.card-header-action > .btn-icon').click();
        delay();
        cy.get('#name').type('naraAyu');
        delay();
        cy.get('#email').type('nara@gmail.com');
        delay();
        cy.get('#password').type('password');
        delay();
        cy.get('.btn-primary').click();
        delay();
        cy.get('p').should('have.text', 'Data Berhasil Ditambahkan');
        delay();
        cy.get('.close > span').click();
        delay();
        cy.get('.table > tbody > :nth-child(4) > :nth-child(2)').should('have.text', 'naraAyu');
        delay();
    });

    it('edit', () => {
        cy.get(':nth-child(4) > .text-right > .d-flex > .btn-info').click();
        delay();
        cy.get('#name').clear().type('Noora Aulia Hidayat');
        delay();
        cy.get('#email').clear().type('noora@gmail.com');
        delay();
        cy.get('.btn-primary').click();
        delay();
        cy.get('.table > tbody > :nth-child(4) > :nth-child(2)').should('have.text', 'Noora Aulia Hidayat');
        delay();
        cy.get('tbody > :nth-child(4) > :nth-child(3)').should('have.text','noora@gmail.com');
        delay();
        cy.get('.card-body').contains('Noora Aulia Hidayat').should('exist');
        delay();
        cy.get('p').should('have.text', 'User Berhasil Diupdate');
    });

    it('delete', () => {
        cy.get(':nth-child(4) > .text-right > .d-flex > .ml-2 > .btn').click();
        delay();
        cy.get('.table-row').should('not.have.length', 3);
        delay();
        cy.get('p').should('have.text', 'User Deleted Successfully');
        delay();
        cy.get('.table > tbody > tr').should('have.length', 3);
        delay();
        cy.get('.card-body').contains('Noora Aulia Hidayat').should('not.exist');
        delay();
        cy.get('.card-body').contains('noora@gmail.com').should('not.exist');
        delay();
    });

});