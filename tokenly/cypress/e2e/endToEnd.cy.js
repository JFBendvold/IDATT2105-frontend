// https://docs.cypress.io/api/introduction/api.html


//Tests for the urls of the webpage
describe('Test visitng the urls of the webpage', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Buying and selling NFTs has never been easier.')
    cy.contains('h1', 'Trending Now')
    cy.contains('h1', 'Newly Listed')
  })

  it('visits the app discover url', () => {
    cy.visit('/discover')
    cy.get('.category-button').should('have.length', 8)
    cy.get('.category-button').first().should('contain', 'Photography')
    cy.get('.category-button').last().should('contain', 'Collectibles')
  })

  it('visits the login url', () => {
    cy.visit('/login')
    cy.get('.login').should('contain', 'Login')
  })

  it('tries to visit the publish url when not logged in', () => {
    cy.visit('/publish')
    cy.get('.login').should('contain', 'Login')
  })

  it('visits the signup url to sign user in', () => {
    cy.visit('/signup')
    cy.get('button').should('contain', 'Sign up')
  })
  
  it('tries to visit the favorites url when the user is not logged in', () => {
    cy.visit('/favorites')
    cy.get('.login').should('contain', 'Login')
  })  
})

const login = (name) => {
  cy.session(name, () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/api/users/token',
      body: { username: name, password: 'password456' },
    }).then(({ body }) => {
      window.sessionStorage.setItem('UserStore', JSON.stringify({ userToken: body, username: name }))
    })
  })
}


describe('Test visiting the urls of the page when the user is logged in (admin user)', () => {

  it('visits the publish url when logged in', () => {
    login('jane')
    cy.visit('/publish')
    cy.get('h1').should('contain', 'Publish')

  })

})

//Tests for functionality, eg buttons and links
