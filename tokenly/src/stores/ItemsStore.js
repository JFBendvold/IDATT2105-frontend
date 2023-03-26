import { defineStore } from 'pinia'

export const useItemsStore = defineStore({
  id: 'ItemsStore',
  state: () => ({
    items: [],
    newItems: []
  }),
  persist: {
    //sessionStorage is used to store current category in the browser's session storage
    storage: sessionStorage
  },
  actions: {
    setItems(items) {
      this.items = items
    },
    setNewItems(items) {
      this.newItems = items
    },
    resetItems() {
      this.items = []
      this.newItems = []
    }
  },
  getters: {
    getItems() {
      return this.items
    },
    getNewItems() {
      return this.newItems
    }
  }
})
