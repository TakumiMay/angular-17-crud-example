describe('home page', () => {
  it('add a tutorial', () => {
    cy.visit('http://localhost:8081/tutorials');
    cy.title().should('equal', 'Angular17Crud');
    cy.get('.btn.btn-sm.btn-danger').click();
    cy.get("a.nav-link").eq(1).click();
    cy.url().should('equal', 'http://localhost:8081/add');
    cy.get('#title').clear().type('New tutorial title');
    cy.get('#description').clear().type('New tutorial description');
    cy.get('button.btn.btn-success').click();
    cy.get("h4").contains("Tutorial was submitted successfully!");
    cy.get("a.nav-link").eq(0).click();
    cy.get('input[placeholder="Search by title"]').type('New tutorial title');
    cy.get('.btn.btn-outline-secondary').click();
    cy.get("h4").contains("Tutorials List");
    cy.get('li.list-group-item').contains('New tutorial title').click();
    cy.get('div').contains('label', 'Description:').parent().contains('New tutorial description');
  });
})