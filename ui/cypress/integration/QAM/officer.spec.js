describe('Login', function(){
    it('Sign in', function(){
        cy.visit('http://localhost:3000/login')
        cy.get('input[type="text"]').type('poorna2152@gmail.com')
        cy.get('input[type="password"]').type('123456')
        cy.get('.MuiButton-label').contains('Sign In').should('be.visible').click()
        cy.contains('Weapons Table', {timeout:5000}).should('be.visible')
    })

    // weapons table
    it('Edit a weapon', function(){
        cy.get('input[placeholder="Search"]').type('Shot Gun',{force: true})
        cy.wait(1000)
        cy.get('button[title="Edit"]').click()
        cy.get('div[aria-label="Status"]').click()
        cy.get('li[data-value="Available"]').click()
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('Weapon Updated Successfully!', {timeout:5000}).should('be.visible')
    })

    //ammunition tab
    it('View ammunation', function(){
        cy.get('.MuiTypography-root').contains('Ammunation').click()
        cy.contains('Ammunation Table', {timeout:10000}).should('be.visible')
    })

    it('Edit a ammunition', function(){
        cy.get('input[placeholder="Search"]').type('2',{force: true})
        cy.wait(1000)
        cy.get('button[title="Edit"]').click()
        cy.get('input[placeholder="Remaning"]').type('20')
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        // cy.get('.MuiAlert-message').contains('Station Updated Successfully!', {timeout:5000}).should('be.visible') 
        cy.get('.MuiAlert-message').contains('Ammunition Updated Successfully!', {timeout:5000}).should('be.visible')
    })

    //recovery table
    it('View recovery', function(){
        cy.get('.MuiTypography-root').contains('Recovery').click()
        cy.contains('Recovery Table', {timeout:10000}).should('be.visible')
    })

    it('Create a recovery', function(){
        cy.get('button[title="Add"]').click({force: true})
        cy.get('input[placeholder="Description"]').type('underworld weapons')
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('Recovery Saved Successfully!', {timeout:5000}).should('be.visible') 
    })

    it('Edit a recovery', function(){
        cy.get('input[placeholder="Search"]').type('underworld weapons',{force: true})
        cy.wait(1000)
        cy.get('button[title="Edit"]').click()
        cy.get('input[placeholder="Description"]').type(' today')
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        // cy.get('.MuiAlert-message').contains('Station Updated Successfully!', {timeout:5000}).should('be.visible') 
        cy.get('.MuiAlert-message').contains('Recovery Updated Successfully!', {timeout:5000}).should('be.visible')
    })

    it('Delete a recovery', function(){
        cy.get('input[placeholder="Search"]').type('underworld weapons today',{force: true})
        cy.wait(1000)
        cy.get('button[title="Delete"]').click()
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('Recovery deletion Successful!', {timeout:5000}).should('be.visible') 
    })

    //maintainence table
    it('View maintenance', function(){
        cy.get('.MuiTypography-root').contains('Maintenance').click()
        cy.contains('Maintenance Table', {timeout:10000}).should('be.visible')
    })

    it('Create a maintenance', function(){
        cy.get('button[title="Add"]').click({force: true})
        cy.get('input[placeholder="Weapon ID"]').type('1')
        cy.get('input[placeholder="Amount"]').type('1000')
        cy.get('input[placeholder="Description"]').type('heavy weapon')
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('Maintainance Record Saved Successfully!', {timeout:5000}).should('be.visible') 
    })

    it('Edit a maintenance', function(){
        cy.get('input[placeholder="Search"]').type('1000',{force: true})
        cy.wait(1000)
        cy.get('button[title="Edit"]').click()
        cy.get('input[placeholder="Amount"]').type('2000')
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        // cy.get('.MuiAlert-message').contains('Station Updated Successfully!', {timeout:5000}).should('be.visible') 
        cy.get('.MuiAlert-message').contains('Maintainance records Updated Successfully!', {timeout:5000}).should('be.visible')
    })

    it('Delete a maintenance', function(){
        cy.get('input[placeholder="Search"]').type('2000',{force: true})
        cy.wait(1000)
        cy.get('button[title="Delete"]').click()
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('Maintenance deletion Successful!', {timeout:5000}).should('be.visible') 
    })

})