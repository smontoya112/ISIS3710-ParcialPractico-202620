describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/auth/login')
    cy.get('#email').type('admin@admin.com')
    cy.get('#password').type('admin')
    cy.get('form').submit()
    cy.get('a[href="/plans/create"]').click()
    
  })
})