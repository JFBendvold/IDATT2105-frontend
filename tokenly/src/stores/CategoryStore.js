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
      const response = await fetchItemsFromCategory(category)
      this.currentCategory = response.data
      return response.data
    },
    resetCategory() {
      this.currentCategory = ''
    }
  },
  getters: {
  }
})
