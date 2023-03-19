import { defineStore } from 'pinia'
import { fetchItemInventory, postItem } from '../services/ItemService'

export const useItemStore = defineStore({
    id: 'ItemStore',
    state: () => (
        {
        inventory: []
        }
    ),
    actions: {
        async getItemInventory(userId) {
            try {
                const response = await fetchItemInventory(userId)

                if(response.status === 200) {
                    this.inventory = response.data
                }
                else {
                    throw new Error(
                        "Could not find any inventory associated with the logged in user" +
                         "Please ensure that the logged in user has saved items.")
                }
                //TODO: push to specific page?
            } catch (error) {
                console.error(error)
            }
        },
        async addItemToInventory(userId, newItem) {
            try {
                const response = await postItem(userId, newItem)

                if(response.status === 200) {
                    this.inventory.push(newItem)
                }
                else {
                    throw new Error(
                        "Could not post a new item to the logged in user. Please try again.")
                }
                //TODO: push to specific page?
            } catch (error) {
                console.error(error)
            }
        },
        //TODO: add methods to update an item
    },
    getters: {
        getInventorySize() {
            return this.inventory.length
        },
        getNewestItem() {
            if(this.getInventorySize > 0) {
                return this.inventory[this.getInventorySize() - 1]
            }
            return "Item inventory empty."
        }
    }

})