import {AUTH0_PASSWORD, AUTH0_USERNAME, SNIPPET_MANAGER_URL, FRONTEND_URL} from "../../src/utils/constants";
import {CreateSnippet} from "../../src/utils/snippet";

describe('Home', () => {
  beforeEach(() => {
    cy.loginToAuth0(
        AUTH0_USERNAME,
        AUTH0_PASSWORD
    )
  })
  before(() => {
    process.env.FRONTEND_URL = Cypress.env("FRONTEND_URL");
    process.env.BACKEND_URL = Cypress.env("BACKEND_URL");
  })
  it('Renders home', () => {
    cy.visit(FRONTEND_URL)
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.MuiTypography-h6').should('have.text', 'Printscript');
    cy.get('.MuiBox-root > .MuiInputBase-root > .MuiInputBase-input').should('be.visible');
    cy.get('.css-9jay18 > .MuiButton-root').should('be.visible');
    cy.get('.css-jie5ja').click();
    /* ==== End Cypress Studio ==== */
  })

  // You need to have at least 1 snippet in your DB for this test to pass
  it('Renders the first snippets', () => {
    cy.visit(FRONTEND_URL)
    const first10Snippets = cy.get('[data-testid="snippet-row"]')

    first10Snippets.should('have.length.greaterThan', 0)

    first10Snippets.should('have.length.lessThan', 10)
  })

  it('Can creat snippet find snippets by name', () => {
    cy.visit(FRONTEND_URL)
    const createSnippet: CreateSnippet = {
      name: "Test name",
      content: "print(1)",
      language: "printscript",
      extension: ".prs"
    }

    cy.intercept('GET', SNIPPET_MANAGER_URL+"/snippets/getAll*", (req) => {
      req.reply((res) => {
        expect(res.statusCode).to.eq(200);
      });
    }).as('getSnippets');

    const token = localStorage.getItem('authAccessToken');
    cy.request({
      method: 'POST',
      url: SNIPPET_MANAGER_URL+'/snippets/create', // Adjust if you have a different base URL configured in Cypress
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: createSnippet,
      failOnStatusCode: false // Optional: set to true if you want the test to fail on non-2xx status codes
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body.name).to.eq(createSnippet.name)
      expect(response.body.content).to.eq(createSnippet.content)
      expect(response.body.language).to.eq(createSnippet.language)
      expect(response.body).to.haveOwnProperty("id")

      cy.get('.MuiBox-root > .MuiInputBase-root > .MuiInputBase-input').clear();
      cy.get('.MuiBox-root > .MuiInputBase-root > .MuiInputBase-input').type(createSnippet.name + "{enter}");

      cy.wait("@getSnippets")
      cy.contains(createSnippet.name).should('exist');
    })
  })
})
