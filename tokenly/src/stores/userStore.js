import { defineStore } from 'pinia'
import { fetchUserId } from '../services/userService'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        id: null,
        activeUsername: null
    }),
    actions: {
        async logUserIn(username, password) {
            try {
                const registeredId = await fetchUserId({
                    username: username,
                    password: password
                    }, 
                )
                if(registeredId) {
                    this.$id = registeredId
                    this.$activeUsername = username
                }
                else {
                    throw new Error("The username and/or password did not match any registered users, please try again.")
                }
                //TODO: push to specific page?
            } catch (error) {
                alert(error)
            }
           
        },
        logUserOut() {
            this.$id = null
            this.$activeUsername = null
            //TODO: push to home? 
        }
        
    },
    getters: {

    }

})