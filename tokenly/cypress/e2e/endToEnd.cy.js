// https://docs.cypress.io/api/introduction/api.html


//Mocks login for the tests by manually sending correct api request and storing the response in the session storage
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

//Mocks logout for the tests by manually clearing the session storage
const logout = () => {
  window.sessionStorage.clear()
}

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

  it('visits the terms url', () => {
    cy.visit('/terms')
    cy.get('p').should('contain', 'Overview')
    cy.get('p').should('contain', 'User Conduct')
    cy.get('p').should('contain', 'Intellectual Property')
    cy.get('p').should('contain', 'Changes to Terms of Service')

  })

  it('visits the privacy url', () => {
    cy.visit('/privacy')
    cy.get('p').should('contain', 'Privacy Policy')
    cy.get('p').should('contain', 'Information we collect')
    cy.get('p').should('contain', 'Security')
    cy.get('p').should('contain', 'Changes to Privacy Policy')

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
  
  it('tries to visit the nft url when the user is not logged in, should work', () => {
    cy.visit('/nft?id=2')
    cy.get('h1').should('contain', 'Pikachu Plushie')
  })  
})

describe('Test visiting the urls of the page when the user is logged in (admin user)', () => {

  beforeEach(() => {
    logout()
    login('jane')
  })  

  it('visits the publish url when logged in', () => {
    cy.visit('/publish')
    cy.get('h1').should('contain', 'Publish')
  })

  it('visits the favorites url when logged in', () => {
    cy.visit('/favorites')
    cy.get('h1').should('contain', 'Favorites')
    cy.get('img').should('have.length', 2)
  })

  it('visits the logged in users profile url when logged in', () => {
    cy.visit('/profile?username=jane')
    cy.get('h1').should('contain', 'jane')
    cy.get('h1').should('contain', 'NFTs')
    cy.get('.ntfs-item').should('have.length', 4)
  })

  it('tries to visit the nft url when the user is logged in, should work', () => {
    cy.visit('/nft?id=2')
    cy.get('h1').should('contain', 'Pikachu Plushie')
  }) 

})

//Tests for functionality, eg buttons and links

describe('Test the functionality of the webpage when not logged in', () => {

  beforeEach(() => {
    logout()
  }) 

  const numberOfLogos = 2
  it('tries to select a the first category, being `Photography`', () => {
    cy.visit('/discover')
    cy.get('.category-button').first().click()
    cy.get('img').should('have.length', 4 + numberOfLogos)
  }) 

  it('tries to select a the last category, being `Collectibles`', () => {
    cy.visit('/discover')
    cy.get('.category-button').last().click()
    cy.get('img').should('have.length', 5 + numberOfLogos)
  }) 

  
  it('tries to click on a nft that is displayed in `Trending Now`', () => {
    cy.visit('/')
    cy.get('.swiper-slide').first().click()
    cy.get('h1').should('contain', 'Vintage Vinyl Record')
  }) 

  it('tries to click on a nft that is displayed in `Newly Listed`', () => {
    cy.visit('/')
    cy.get('.swiper-slide').first().click() //TODO: Change this to the nft in the newly listed list
    cy.get('h1').should('contain', 'Vintage Vinyl Record')
  }) 

  it('tries to click the footer `Home` link', () => {
    cy.visit('/')
    cy.get('a').contains('Home').click()
    cy.contains('h1', 'Buying and selling NFTs has never been easier.')
  }) 

  it('tries to click the footer `Discover` link', () => {
    cy.visit('/')
    cy.get('a').contains('Discover').click()
    cy.get('button').contains('Trending')
  }) 

  it('tries to click the footer `Terms of Service` link', () => {
    cy.visit('/')
    cy.get('a').contains('Terms of Service').click()
    cy.get('p').should('contain', 'Overview')
  }) 

  it('tries to click the footer `Privacy Policy` link', () => {
    cy.visit('/')
    cy.get('a').contains('Privacy Policy').click()
    cy.get('p').should('contain', 'Privacy Policy')
  }) 

})

//TODO: TEST that the button heart is filled, click

describe('Test the functionality of the webpage when logged in', () => {
  beforeEach(() => {
    logout()
    login('jane')
  })  

  it('tries to go to profile favorites and then redirects when pressing the arrow btn', () => {
    cy.visit('/nft?id=5')
    cy.visit('/favorites')
    cy.get('.fa-arrow-right').first().click()
    cy.get('h1').should('contain', 'Canon EOS R')
  })

  it.only('tries to go to profile favorites and then remove a favorite', () => {
    cy.visit('/nft?id=5')

    cy.get('.fa-heart').then(($heart) => {
      if ($heart.hasClass('far')) {
        cy.get('.fa-heart').click()
      } 
    })

    cy.visit('/favorites')

    cy.get('.favorites-grid-item').should('have.length', 1)
    cy.get('.remove-icon').last().click() //TODO: update    
  })

})