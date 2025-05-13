/// <reference types='cypress' />
import generateUser from '../support/generateUser';

describe('Web Tables page', () => {
  const { firstName, lastName, age, email, salary, department } =
    generateUser();
  const {
    firstName: newFirstName,
    lastName: newLastName,
    age: newAge,
    salary: newSalary,
    email: newEmail,
    department: newDepartment
  } = generateUser();

  beforeEach(() => {
    cy.visit('/');
  });

  it('should allow adding a new worker', () => {
    cy.fillTheForm(firstName, lastName, email, age, salary, department);
    cy.get('#firstName').should('have.value', firstName);
    cy.get('#lastName').should('have.value', lastName);
    cy.get('#userEmail').should('have.value', email);
    cy.get('#age').should('have.value', age);
    cy.get('#salary').should('have.value', salary);
    cy.get('#department').should('have.value', department);
    cy.get('#submit').click();
    cy.contains('[role="row"]', firstName)
      .should('contain.text', firstName)
      .should('contain.text', lastName)
      .should('contain.text', age)
      .should('contain.text', email)
      .should('contain.text', salary)
      .should('contain.text', department);
  });

  it('should allow deleting a worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.fillTheForm(firstName, lastName, email, age, salary, department);
    cy.get('#submit').click();
    cy.contains('[role="row"]', email).within(() => {
      cy.get('[title="Delete"]').click();
    });
    cy.contains('[role="row"]', email).should('not.exist');
  });

  it('should allow deleting all workers', () => {
    cy.get('#addNewRecordButton').click();
    // eslint-disable-next-line max-len
    cy.fillTheFormAndAddWorker(firstName, lastName, email, age, salary, department);
    cy.contains('.rt-noData', 'No rows found').should('not.exist');

    cy.get('[title="Delete"]').then((el) => {
      for (let i = 0; i < el.length; i++) {
        cy.get('[title="Delete"]').first().click();
      }
    });

    cy.contains('.rt-noData', 'No rows found').should('exist');
  });

  // eslint-disable-next-line max-len
  it('should allow to find a user in the search field and edit the user info', () => {
    cy.get('#addNewRecordButton').click();
    // eslint-disable-next-line max-len
    cy.fillTheFormAndAddWorker(firstName, lastName, email, age, salary, department);

    cy.contains('[role="row"]', newFirstName).should('not.exist');
    cy.get('#searchBox').type(firstName);
    cy.contains('[role="row"]', firstName).should('exist');
    cy.contains('[role="row"]', firstName).within(() => {
      cy.get('[title="Edit"]').click();
    });

    cy.clearTheForm();
    // eslint-disable-next-line max-len
    cy.fillTheFormAndAddWorker(newFirstName, newLastName, newEmail, newAge, newSalary, newDepartment);
    cy.get('#searchBox').clear();
    cy.contains('[role="row"]', newFirstName)
      .should('contain.text', newFirstName)
      .should('contain.text', newLastName)
      .should('contain.text', newAge)
      .should('contain.text', newEmail)
      .should('contain.text', newSalary)
      .should('contain.text', newDepartment);
  });

  it('should have 9 workers in the table', () => {
    cy.addFiveUsers();
    cy.get('#addNewRecordButton').click();
    // eslint-disable-next-line max-len
    cy.fillTheFormAndAddWorker(firstName, lastName, email, age, salary, department);
    cy.get('[role="rowgroup"]').each((el, i) => {
      if (i === 8) {
        cy.wrap(el).should('contain.text', firstName);
      }
      if (i === 9) {
        cy.wrap(el).should('contain.text', '');
      }
    });
  });

  it(`should have correct pagination with ${firstName} as the last worker on page 2`, () => {
    cy.addFiveUsers();
    cy.get('#addNewRecordButton').click();
    // eslint-disable-next-line max-len
    cy.fillTheFormAndAddWorker(firstName, lastName, email, age, salary, department);
    cy.get('[aria-label="rows per page"]').select('5');
    cy.get('[role="rowgroup"]').its('length').should('eq', 5);
    cy.get('[aria-label="jump to page"]').type('2{Enter}');

    cy.get('[role="rowgroup"]').each((el, i) => {
      if (i === 3) {
        cy.wrap(el).should('contain.text', firstName);
      }
      if (i === 4) {
        cy.wrap(el).should('contain.text', '');
      }
    });
  });

  it.only('should search by each column value', () => {
    cy.get('#addNewRecordButton').click();
    // eslint-disable-next-line max-len
    cy.fillTheFormAndAddWorker(firstName, lastName, email, age, salary, department);

    cy.get('#searchBox').type(firstName);
    cy.contains('[role="row"]', firstName).should('contain.text', email);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(lastName);
    cy.contains('[role="row"]', lastName).should('contain.text', email);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(email);
    cy.contains('[role="row"]', email).should('contain.text', lastName);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(age);
    cy.contains('[role="row"]', age).should('contain.text', email);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(salary);
    cy.contains('[role="row"]', salary).should('contain.text', email);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(department);
    cy.contains('[role="row"]', department).should('contain.text', email);
  });
});
