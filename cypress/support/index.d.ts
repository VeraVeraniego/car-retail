declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to ... add your description here
     * @example cy.clickOnMyJourneyInCandidateCabinet()
     */
    getByTestId(testid: string): Chainable<null>;
    getSelectByName(name: string): Chainable<null>;
    getByPlaceholder(placeholder: string): Chainable<null>;
    clickOnMyJourneyInCandidateCabinet(): Chainable<null>;
  }
}
