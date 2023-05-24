describe('Test conversation', () => {
  beforeEach(() => {
    cy.visit('localhost:4200');
  })

  it('register a user', () =>{
    cy.get('[data-cy="name__input"]').type("Matias Damasio");
    cy.get('[data-cy="name__submit-btn"]').click();
  })
  
  it('post a comment', () => {
    //
    cy.get('[data-cy="name__input"]').type("Matias Damasio");
    cy.get('[data-cy="name__submit-btn"]').click();
    //
    const text = "This is a test. This text should be visible to the comment feed once submitted";
    cy.get('[data-cy="comment__input"]').type(text);
    cy.get('[data-cy="comment__submit-btn"]').click()
    cy.get('[data-cy="comment-list__ul').children().last().should('contain', text)

  })
})