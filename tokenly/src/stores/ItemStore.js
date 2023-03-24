import { defineStore } from 'pinia'

export const useItemStore = defineStore({
  id: 'ItemStore',
  state: () => ({
    currentItem: '',
  }),
  persist: {
    //sessionStorage is used to store current category in the browser's session storage
    storage: sessionStorage
  },
  actions: {
    setCurrentItem(item) {
        this.currentItem = item
    },
    resetCurrentItem() {
        this.currentItem = ''
    }
  },
  getters: {
  }
})
