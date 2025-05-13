// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import generateUser from './generateUser';

Cypress.Commands.add('fillTheForm',
  (firstName, lastName, email, age, salary, department) => {
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
  });

Cypress.Commands.add('clearTheForm', () => {
  cy.get('#firstName').clear();
  cy.get('#lastName').clear();
  cy.get('#userEmail').clear();
  cy.get('#age').clear();
  cy.get('#salary').clear();
  cy.get('#department').clear();
});

Cypress.Commands.add('fillTheFormAndAddWorker',
  (firstName, lastName, email, age, salary, department) => {
    cy.fillTheForm(firstName, lastName, email, age, salary, department);
    cy.get('#submit').click();
  });

Cypress.Commands.add('addFiveUsers', () => {
  for (let i = 0; i < 5; i++) {
    const { firstName, lastName, email, age, salary, department } =
      generateUser();

    cy.get('#addNewRecordButton').click();
    cy.fillTheForm(firstName, lastName, email, age, salary, department);
    cy.get('#submit').click();
  }
});
