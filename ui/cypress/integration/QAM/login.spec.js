describe('Login', function(){
    it('Sign in', function(){
        cy.visit('http://localhost:3000/login')
        cy.get('input[type="text"]').type('kavindag.18@cse.mrt.ac.lk')
        cy.get('input[type="password"]').type('sapumal')
        cy.get('.MuiButton-label').contains('Sign In').should('be.visible').click()
    })
})