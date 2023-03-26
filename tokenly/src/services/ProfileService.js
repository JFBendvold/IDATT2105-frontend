import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/profiles',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

//Gets the information associated with the logged in username
export async function fetchUserProfile(username) {
    try {
      const response = await apiClient.get('/profile/username/' + username)
      return response
    } catch (error) {
      throw new Error(
        "Insufficinet funds"
      )
  }
}

//Changes the balance of the user
export async function addBalance(userId, balance) {
  try {
    const response = await apiClient.put('/profile/' + userId + '/addBalance?balance=' + balance)
    return response
  } catch (error) {
    throw new Error(
      'There was an error while changing the balance: ' + error.response.statusText
    )
  }
}
