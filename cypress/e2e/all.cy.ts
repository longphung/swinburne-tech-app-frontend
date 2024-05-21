/// <reference types="cypress" />

const BASE_URL = 'https://techaway.phungnnl.dev';

// eslint-disable-next-line max-lines-per-function
describe('All tests', () => {
  it('loads', () => {
    cy.visit(`${BASE_URL}`);
  });

  it('demonstrates login', () => {
    cy.visit(`${BASE_URL}/login`);

    // Replace the selectors with the actual ones from your application
    cy.get('#username').type('longphung.nn@gmail.com');
    cy.get('#password').type('Hello@123');

    cy.get('form').submit();
  });
});
