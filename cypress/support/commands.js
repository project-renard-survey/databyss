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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add(
  'nextBlock',
  {
    prevSubject: 'element',
  },
  subject => {
    return cy.get(subject).type('{command}{shift}p')
  }
)

Cypress.Commands.add(
  'previousBlock',
  {
    prevSubject: 'element',
  },
  subject => {
    return cy.get(subject).type('{command}{shift}o')
  }
)

Cypress.Commands.add(
  'endOfLine',
  {
    prevSubject: 'element',
  },
  subject => {
    return cy.get(subject).type('{command}{shift}{rightarrow}')
  }
)

Cypress.Commands.add(
  'startOfLine',
  {
    prevSubject: 'element',
  },
  subject => {
    return cy.get(subject).type('{command}{shift}{leftarrow}')
  }
)

Cypress.Commands.add(
  'startOfDoc',
  {
    prevSubject: 'element',
  },
  subject => {
    return cy.get(subject).type('{command}{shift}{uparrow}')
  }
)

Cypress.Commands.add(
  'endOfDoc',
  {
    prevSubject: 'element',
  },
  subject => {
    return cy.get(subject).type('{command}{shift}{downarrow}')
  }
)

Cypress.Commands.add(
  'newLine',
  {
    prevSubject: 'element',
  },
  subject => {
    return cy
      .get(subject)
      .trigger('keydown', { key: 'Enter', release: false })
      .wait(10)
      .trigger('keyup', { key: 'Enter', release: false })
  }
)
