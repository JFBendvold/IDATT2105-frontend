import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/items', 
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

//Retrieves the logged in users' item inventory of saved items
export async function fetchItemInventory(userId) {
    try {
        const response = await apiClient.get("/inventory/" + userId) 
        return response
    } catch (error) {
        throw new Error("There was an error while fetching the users saved items: " + error.response.statusText)
    }
}

//Posts a new item to the logged in users' item inventory
export async function postItem(userId) {
    try {
        const response = await apiClient.post("/inventory/" + userId) 
        return response
    } catch (error) {
        throw new Error("There was an error while posting a new item to the user inventory: " + error.response.statusText)
    }
}