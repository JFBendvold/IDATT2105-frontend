import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/itemsCategories',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

//Fetches all categories from the database
export async function fetchItemsFromCategory(categoryName) {
  try {
    const response = await apiClient.get('/items/' + categoryName)
    console.log(response)
    return response
  } catch (error) {
    throw new Error('There was an error while fetching the requested category: ' + error)
  }
}

export async function fetchAllItems() {
  try {
    const response = await apiClient.get('/')
    console.log(response)
    return response
  } catch (error) {
    throw new Error('There was an error while fetching the requested item: ' + error)
  }
}
