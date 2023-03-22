import { defineStore } from 'pinia'
import { fetchUserToken } from '../services/UserService'
import router from '@/router/index.js'

export const useUserStore = defineStore({
  id: 'UserStore',
  state: () => ({
    mockUser: {
      username: 'mock',
      password: 'mock',
    },
    userToken: null,
    username: null,
  }),
  actions: {
    //Sends an api call to backend via post call which validates the user credentials (username, password)
    async logUserIn(username, password) {
      try {
        //Tries to store the response of the call to the constant 'response'
        const response = await fetchUserId({
          username: username,
          password: password
        })
        //Occurs if the response is returned with a status code 200 (OK)
        if (response.status === 200) {
          this.userToken = response.data.userToken
          this.username = username
          //Additional check to validate if the user is supposed to be an admin
          if (response.data.admin) {
            //TODO: must be updated
            this.admin = true
          }
        } else {
          throw new Error(
            'The username and/or password did not match any registered users, please try again.'
          )
        }
        //TODO: push to specific page?
        //Console logs errors
      } catch (error) {
        console.error(error)
      }
    },
    //Temp function to log in a mock user
    tempLogUserIn(username, password) {
      if (username === '' || password === '') {
        return false
      }

      if (username === this.mockUser.username && password === this.mockUser.password) {
        this.userToken = "TESTTESTTESTTESTTEST"
        this.username = this.mockUser.username
        router.push({ name: 'home' }) //TODO: redirect to logged in page
        console.log(true)
        return true //"The mock user was successfully logged in!"
      } else {
        console.log(false)
        return false //"The login failed, please provide the correct username and password for the mock user."
      }
    },

    //Logs the current user out, and resets state to default
    logUserOut() {
      this.userToken = null
      this.username = null
      this.admin = false
      //TODO: push to home?
    }
    //TODO: add methods to update username, password, name etc...
  },
  getters: {
    isLoggedIn() {
      return this.userId != null
    }
  }
})
