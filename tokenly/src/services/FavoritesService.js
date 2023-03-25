import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/wishlists',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

//Posts a new favorite to the logged in user's favorites/wishlist
export async function addToFavorites(params) {
    try {
        const response = await apiClient.post('/wishlist', params)
        return response
    } catch (error) {
        throw new Error('There was an error while adding to favorites: ' + error)
    }
}

export async function fetchAllFavorites(username) {
    try {
        const response = await apiClient.get('/user/' + username)
        return response
    } catch (error) {
        throw new Error('There was an error while fetching favorites: ' + error)
    }
}