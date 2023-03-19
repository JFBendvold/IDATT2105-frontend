import { defineStore } from 'pinia'
import { fetchUserId } from '../services/UserService'

export const useUserStore = defineStore({
    id: 'UserStore',
    state: () => (
        {
        userId: null,
        username: null
        }
    ),
    actions: {
        async logUserIn(username, password) {
            try {
                const response = await fetchUserId({
                    username: username,
                    password: password
                    }, 
                )
                if(response.status === 200) {
                    this.userId = response.data
                    this.username = username
                }
                else {
                    throw new Error("The username and/or password did not match any registered users, please try again.")
                }
                //TODO: push to specific page?
            } catch (error) {
                console.error(error)
            } 
           
        },
        logUserOut() {
            this.userId = null
            this.username = null
            //TODO: push to home? 
        },
        //TODO: add methods to update username, password, name etc...
        
    },
    getters: {
        isLoggedIn() {
            return this.userId != null
        }

    }

})