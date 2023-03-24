import { defineStore } from 'pinia'

export const useItemsStore = defineStore({
  id: 'ItemsStore',
  state: () => ({
    items: [],
  }),
  persist: {
    //sessionStorage is used to store current category in the browser's session storage
    storage: sessionStorage
  },
  actions: {
    setItems(items) {
        this.items = items
        console.log("Items set: " + this.items)
    },
    resetItems() {
        this.items = []
    }
  },
  getters: {
    getItems() {
        return this.items
    }
  }
})
