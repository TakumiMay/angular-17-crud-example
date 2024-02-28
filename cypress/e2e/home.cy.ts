describe('home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/api/tutorials');
  });

  it('has the correct text', () => {
    cy.title().should('equal', 'Angular17Crud');
  });

  it('add a tutorial', () => {
    cy.get("a.nav-link").eq(1).click();
    cy.url().should('equal', 'http://localhost:8081/add');
    cy.get('#title').clear().type('New tutorial title');
    cy.get('#description').clear().type('New tutorial description');
    cy.get('button.btn.btn-success').click();
    //cy.url().should('equal', 'http://localhost:8081/tutorials');
  });

})