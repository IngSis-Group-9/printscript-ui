import {AUTH0_PASSWORD, AUTH0_USERNAME, CODE_PROCESSING_URL, SNIPPET_MANAGER_URL} from "../../src/utils/constants";

describe('Add snippet tests', () => {
  beforeEach(() => {
    cy.loginToAuth0(
        AUTH0_USERNAME,
        AUTH0_PASSWORD
    )
  })
  it('Can add snippets manually', () => {
    cy.visit("/home")
    cy.intercept('POST', SNIPPET_MANAGER_URL+"/snippets/create", (req) => {
      req.reply((res) => {
        expect(res.body).to.include.keys("id","name","content","language")
        expect(res.statusCode).to.eq(200);
      });
    }).as('postRequest');

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.css-9jay18 > .MuiButton-root').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#name').type('Some snippet name');
    cy.get('#demo-simple-select').click()
    cy.get('[data-testid="menu-option-printscript"]').click()

    cy.get('[data-testid="add-snippet-code-editor"]').click();
    cy.get('[data-testid="add-snippet-code-editor"]').type(`const snippet: String = "some snippet" \n print(snippet)`);
    cy.get('[data-testid="SaveIcon"]').click();

    cy.wait('@postRequest').its('response.statusCode').should('eq', 200);
  })

  it('Can add snippets via file', () => {
    cy.visit("/home")
    cy.intercept('POST', SNIPPET_MANAGER_URL+"/snippets/create", (req) => {
      req.reply((res) => {
        expect(res.body).to.include.keys("id","name","content","language")
        expect(res.statusCode).to.eq(200);
      });
    }).as('postRequest');

    // Forces to wait until the request of get file types is finished
    cy.intercept('GET', CODE_PROCESSING_URL+"/fileTypes/getTypes", (req) => {
      req.reply((res) => {
          expect(res.statusCode).to.eq(200);
      });
    }).as('getSnippets');

    // Forces to wait until the request of get file types is finished
    cy.wait('@getSnippets').its('response.statusCode').should('eq', 200);

    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-testid="upload-file-input"').selectFile("cypress/fixtures/example_ps.prs", {force: true})

    cy.get('[data-testid="SaveIcon"]').click();

    cy.wait('@postRequest').its('response.statusCode').should('eq', 200);
  })
})
