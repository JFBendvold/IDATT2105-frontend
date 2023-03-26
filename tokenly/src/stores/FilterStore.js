import { defineStore } from 'pinia'

export const useFilterStore = defineStore({
  id: 'FilterStore',
  state: () => ({
    categories: [],
    status: '',
    orderBy: '',
    minPrice: '',
    maxPrice: ''
  }),
  persist: {
    //sessionStorage is used to store current filter in the browser's session storage
    storage: sessionStorage
  },
  actions: {
    setCategories(categories) {
      this.categories = categories
    },
    setStatus(status) {
      this.status = status
    },
    setOrderBy(orderBy) {
      this.orderBy = orderBy
    },
    setMinPrice(minPrice) {
      this.minPrice = minPrice
    },
    setMaxPrice(maxPrice) {
      this.maxPrice = maxPrice
    },
    resetFilter() {
      this.categories = []
      this.status = ''
      this.minPrice = ''
      this.maxPrice = ''
    }
  },
  getters: {}
})
