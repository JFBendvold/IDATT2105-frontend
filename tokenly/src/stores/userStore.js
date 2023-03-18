import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        id: null,
        activeUsername: null,


    }),
    actions: {
        logUserIn(user) {
            //TODO: fetch user from backend api
            this.$id = user.id
            this.activeUsername = user.username
            //TODO: push to specific page?
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