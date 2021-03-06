describe('Admin', function(){
    it('Log in', function(){
        cy.visit('http://localhost:3000/login')
        cy.get('input[type="text"]').type('isuru.18@cse.mrt.ac.lk')
        cy.get('input[type="password"]').type('b2lqpQ8444')
        cy.get('.MuiButton-label').contains('Sign In').should('be.visible').click()
        cy.contains('User Table', {timeout:5000}).should('be.visible')
    })

    it('Create a user', function(){
        cy.get('button[title="Add"]').click({force: true})
        cy.get('input[placeholder="Name"]').type('Sugath')
        cy.get('input[placeholder="Email"]').type('sugath@gmail.com')
        cy.get('div[aria-label="Role"]').click()
        cy.get('li[data-value="admin"]').click()
        cy.get('input[placeholder="station Name"]').type('Matara')
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('User Saved Successfully!', {timeout:5000}).should('be.visible') 
        cy.reload()
    })

    it('Edit a user', function(){
        cy.get('input[placeholder="Search"]').type('Sugath',{force: true})
        cy.wait(1000)
        cy.get('button[title="Edit"]').click()
        cy.get('input[placeholder="Name"]').type('apala')
        cy.get('div[aria-label="Role"]').click()
        cy.get('li[data-value="officer"]').click()
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('User Updated Successfully!', {timeout:5000}).should('be.visible') 
        cy.reload()
    })

    it('Delete a user', function(){
        cy.get('input[placeholder="Search"]').type('Sugathapala',{force: true})
        cy.wait(1000)
        cy.get('button[title="Delete"]').click()
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('User deletion Successful!', {timeout:5000}).should('be.visible') 
        cy.reload()
    })

    it('View stations', function(){
        cy.get('.MuiTypography-root').contains('Stations').click()
        cy.contains('Stations Table', {timeout:10000}).should('be.visible')
    })

    it('Create a station', function(){
        cy.get('button[title="Add"]').click({force: true})
        cy.get('input[placeholder="Name"]').type('Camp001')
        cy.get('input[placeholder="Location"]').type('Camp001')
        cy.get('div[aria-label="Type"]').click()
        cy.get('li[data-value="office"]').click()
        cy.get('input[placeholder="Contact Number"]').type('0112123123')
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('Station Saved Successfully!', {timeout:5000}).should('be.visible') 
        cy.reload()
    })

    it('Edit a station', function(){
        cy.get('input[placeholder="Search"]').type('Camp001',{force: true})
        cy.wait(1000)
        cy.get('button[title="Edit"]').click()
        cy.get('input[placeholder="Name"]').type('-navy')
        cy.get('div[aria-label="Type"]').click()
        cy.get('li[data-value="inventory"]').click()
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        // cy.get('.MuiAlert-message').contains('Station Updated Successfully!', {timeout:5000}).should('be.visible') 
        cy.get('.MuiAlert-message').contains('Statin Updated Successfully!', {timeout:5000}).should('be.visible')
        cy.reload()
    })

    it('Delete a station', function(){
        cy.get('input[placeholder="Search"]').type('Camp001-navy',{force: true})
        cy.wait(1000)
        cy.get('button[title="Delete"]').click()
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('Station deletion Successful!', {timeout:5000}).should('be.visible') 
        cy.reload()
    })

})