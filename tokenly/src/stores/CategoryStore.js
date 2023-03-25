import { defineStore } from 'pinia'
import { fetchItemsFromCategory } from '@/services/CategoryService.js'

export const useCategoryStore = defineStore({
  id: 'CategoryStore',
  state: () => ({
    currentCategory: '',
  }),
  persist: {
    //sessionStorage is used to store current category in the browser's session storage
    storage: sessionStorage
  },
  actions: {
    async setCategory(category) {
      this.currentCategory = category
    },
    resetCategory() {
      this.currentCategory = ''
    }
  },
  getters: {
  }
})
