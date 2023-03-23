import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/items',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

//Posts a new item to the logged in users' item inventory
export async function postItem(newItem) {
    try {
      const response = await apiClient.post('/t/', newItem, { //TODO: Change this to the correct path   
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response)
      return response
    } catch (error) {
      throw new Error(
        'There was an error while posting a new item to the user inventory: ' +
          error
      )
    }
  }
