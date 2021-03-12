describe('Login', function(){
    it('Sign in', function(){
        cy.visit('http://localhost:3000/login')
        cy.get('input[type="text"]').type('kavindag.18@cse.mrt.ac.lk')
        cy.get('input[type="password"]').type('sapumal')
        cy.get('.MuiButton-label').contains('Sign In').should('be.visible').click()
        cy.contains('Companies Table', {timeout:5000}).should('be.visible')
    })

    //companies table
    it('View companies', function(){
        cy.get('.MuiTypography-root').contains('Companies').click()
        cy.contains('Companies Table', {timeout:10000}).should('be.visible')
    })

      it('Create a company', function(){
          cy.get('button[title="Add"]').click({force: true})
          cy.get('input[placeholder="Name"]').type('comp')
          cy.get('input[placeholder="Contact Number"]').type('0913243628')
          cy.get('input[placeholder="Address"]').type('Indiana')
          cy.get('input[placeholder="Description"]').type('Good')
          cy.get('button[title="Save"]').click()
          cy.wait(5000)
         cy.get('main').scrollTo('top')
          cy.get('.MuiAlert-message').contains('Company Saved Successfully!', {timeout:5000}).should('be.visible') 
          cy.reload()
      })

      it('Edit a company', function(){
          //cy.reload()
          cy.get('input[placeholder="Search"]').type('0913243628',{force: true})
          cy.wait(5000)
          cy.get('button[title="Edit"]').click()
          cy.get('input[placeholder="Name"]').type('abc')
          //cy.get('input[placeholder="Contact Number"]').type('43628')
          cy.get('input[placeholder="Address"]').type('Indiana')
          cy.get('input[placeholder="Description"]').type('Good')
          cy.get('button[title="Save"]').click()
          cy.wait(5000)
          cy.get('main').scrollTo('top')
          cy.get('.MuiAlert-message').contains('Company Updated Successfully!', {timeout:5000}).should('be.visible') 
          cy.reload()
      })

    it('Delete a company', function(){
        cy.reload()
        cy.get('input[placeholder="Search"]').type('compabc',{force: true})
        cy.wait(10000)
        cy.get('button[title="Delete"]').click()
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('Company deletion Successful!', {timeout:5000}).should('be.visible') 
        cy.reload()
    })

    //ammunition table
    it('View ammunation', function(){
        cy.get('.MuiTypography-root').contains('Ammunitions').click()
        cy.contains('Ammunition Table', {timeout:10000}).should('be.visible')
    })

    it('Edit ammunition', function(){
        cy.reload()
        cy.get('input[placeholder="Search"]').type('2',{force: true})
        cy.wait(1000)
        cy.get('button[title="Edit"]').click()
        cy.get('input[placeholder="Remain"]').type('20')
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        // cy.get('.MuiAlert-message').contains('Station Updated Successfully!', {timeout:5000}).should('be.visible') 
        cy.get('.MuiAlert-message').contains('Ammunition Updated Successfully!', {timeout:5000}).should('be.visible')
    })

    //weapons table

    it('View weapons', function(){
        cy.get('.MuiTypography-root').contains('Weapons').click()
        cy.contains('Weapons Table', {timeout:10000}).should('be.visible')
    })

    it('Add a weapon', function(){
        cy.get('button[title="Add"]').click({force: true})
        cy.get('div[aria-label="State"]').click()
        cy.get('li[data-value="Available"]').click()
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('Weapon Saved Successfully!', {timeout:5000}).should('be.visible') 
        cy.reload()
    })

    it('Edit a weapon', function(){
        cy.reload()
        cy.get('input[placeholder="Search"]').type(1,{force: true})
        cy.wait(1000)
        cy.get('button[title="Edit"]').click()
        cy.get('div[aria-label="State"]').click()
        cy.get('li[data-value="Available"]').click()
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('Weapon Updated Successfully!', {timeout:5000}).should('be.visible')
    })

    //weapons models table
    it('View weapon models', function(){
        cy.get('.MuiTypography-root').contains('Weapon Models').click()
        cy.contains('Weapon Table', {timeout:10000}).should('be.visible')
    })

    it('Add a weapon model', function(){
        cy.get('button[title="Add"]').click({force: true})
        cy.get('div[aria-label="State"]').click()
        cy.get('li[data-value="Available"]').click()
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('Weapon Saved Successfully!', {timeout:5000}).should('be.visible') 
        cy.reload()
    })

    it('Edit a weapon', function(){
        cy.reload()
        cy.get('input[placeholder="Search"]').type(1,{force: true})
        cy.wait(1000)
        cy.get('button[title="Edit"]').click()
        cy.get('input[placeholder="Name"]').type('Sniper')
        cy.get('input[placeholder="Description"]').type('Used to shoot')
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('Weapon Model Saved Successfully!', {timeout:5000}).should('be.visible')
    })

    it('Delete a weapon model', function(){
        cy.reload()
        cy.get('input[placeholder="Search"]').type('Machine gun',{force: true})
        cy.wait(10000)
        cy.get('button[title="Delete"]').click()
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('Weapon deletion Successful!', {timeout:5000}).should('be.visible') 
        cy.reload()
    })

    //ammunition model table
    it('View ammunation', function(){
        cy.get('.MuiTypography-root').contains('Ammunition Models').click()
        cy.contains('Ammunition Table', {timeout:10000}).should('be.visible')
    })

    it('Add ammunition models', function(){
        cy.get('button[title="Add"]').click({force: true})
        cy.get('input[placeholder="Name"]').type('Sniper')
        cy.get('input[placeholder="Description"]').type('Used to shoot')
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('Ammunition Model Saved Successfully!', {timeout:5000}).should('be.visible') 
        cy.reload()
    })

    it('Edit ammunition', function(){
        cy.reload()
        cy.get('input[placeholder="Search"]').type('2',{force: true})
        cy.wait(1000)
        cy.get('button[title="Edit"]').click()
        cy.get('input[placeholder="Name"]').type('Sniper')
        cy.get('input[placeholder="Description"]').type('Used to shoot')
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        // cy.get('.MuiAlert-message').contains('Station Updated Successfully!', {timeout:5000}).should('be.visible') 
        cy.get('.MuiAlert-message').contains('Ammunition Model Updated Successfully!', {timeout:5000}).should('be.visible')
    })

    it('Delete a ammunition model', function(){
        cy.reload()
        cy.get('input[placeholder="Search"]').type('caliber 7.62',{force: true})
        cy.wait(10000)
        cy.get('button[title="Delete"]').click()
        cy.get('button[title="Save"]').click()
        cy.wait(5000)
        cy.get('main').scrollTo('top')
        cy.get('.MuiAlert-message').contains('Ammunition Model deletion Successful!', {timeout:5000}).should('be.visible') 
        cy.reload()
    })

    it('View recovery', function(){
        cy.get('.MuiTypography-root').contains('Recovery').click()
        cy.contains('Recovery Table', {timeout:10000}).should('be.visible')
    })

    it('View maintenance', function(){
        cy.get('.MuiTypography-root').contains('Maintenance').click()
        cy.contains('Maintenance Table', {timeout:10000}).should('be.visible')
    })

    it('View stations', function(){
        cy.get('.MuiTypography-root').contains('Stations').click()
        cy.contains('Stations Table', {timeout:10000}).should('be.visible')
    })

    it('View orders', function(){
        cy.get('.MuiTypography-root').contains('ViewOrders').click()
        cy.contains('Order Table', {timeout:10000}).should('be.visible')
    })

    it('View requests', function(){
        cy.get('.MuiTypography-root').contains('View Requests').click()
        cy.contains('Stations Table', {timeout:10000}).should('be.visible')
    })
})