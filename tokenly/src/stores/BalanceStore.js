import { defineStore } from 'pinia'

export const useBalanceStore = defineStore({
  id: 'BalanceStore',
  state: () => ({
    currentBalace: ''
  }),
  persist: {
    //sessionStorage is used to store current balance in the browser's session storage
    storage: sessionStorage
  },
  actions: {
    setBalance(balance) {
      this.currentBalance = balance
    },
    increaseBalance(balance) {
      //TODO: Add checks
      this.currentBalance += balance
    },
    decreaseBalance(balance) {
      this.currentBalance -= balance
    },
    resetBalance() {
      this.currentCategory = 0
    }
  },
  getters: {}
})
