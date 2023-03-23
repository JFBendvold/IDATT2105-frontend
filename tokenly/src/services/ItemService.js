import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/items',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

//Retrieves the defualt trending items for the home page display
export async function fetchTrendingDisplay(amount) {
  try {
    const response = await apiClient.post('/trending', amount)
    return response
  } catch (error) {
    throw new Error(
      'There was an error while fetching the users saved items: ' + error
    )
  }
}

//Retrieves the logged in users' item inventory of saved items
export async function fetchItemInventory(userId) {
  try {
    const response = await apiClient.get('/inventory/' + userId)
    return response
  } catch (error) {
    throw new Error(
      "There was an error while fetching the users' saved items: " + error
    )
  }
}

//Fetches an item from the database to display on the website
export async function fetchItem(itemId) {
  try {
    const response = await apiClient.get('/id/' + itemId)
    console.log(response)
    return response
  } catch (error) {
    throw new Error(
      'There was an error while fetching the requested item: ' + error
    )
  }
}

//Fetches an item from the database to display on the website
export async function fetchItemFromPath(sourcePath) {
  try {
    const response = await apiClient.get('/')
    return response
  } catch (error) {
    throw new Error(
      'There was an error while fetching the requested item: ' + error
    )
  }
}

//Fetches an item from the database to display on the website
export async function fetchAllItems() {
  try {
    const response = await apiClient.get('/')
    console.log(response)
    return response
  } catch (error) {
    throw new Error(
      'There was an error while fetching the requested item: ' + error
    )
  }
}

//Posts a new item to the logged in users' item inventory
export async function postItem(userToken, newItem) {
  try {
    const response = await apiClient.post('/inventory/' + userId, newItem)
    return response
  } catch (error) {
    throw new Error(
      'There was an error while posting a new item to the user inventory: ' +
        error
    )
  }
}
