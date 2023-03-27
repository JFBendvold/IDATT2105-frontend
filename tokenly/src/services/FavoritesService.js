import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

//Posts a new favorite to the logged in user's favorites/wishlist
export async function addToFavorites(params) {
  try {
    const response = await apiClient.post('/wishlists/wishlist', params)
    return response
  } catch (error) {
    throw new Error('There was an error while adding to favorites: ' + error)
  }
}

export async function fetchAllFavorites(username) {
  try {
    const response = await apiClient.get('/itemListing/user?username=' + username)
    return response
  } catch (error) {
    throw new Error('There was an error while fetching favorites: ' + error)
  }
}

export async function removeItemFromFavorites(params) {
  try {
    const response = await apiClient.delete('/wishlists/wishlist/item', {
      data: params
    })
    return response
  } catch (error) {
    throw new Error('There was an error while deleting favorite: ' + error)
  }
}
