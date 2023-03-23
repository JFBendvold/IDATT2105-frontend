import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/users',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

//Retrieves the user token associated with the requestedUser based on the client's input
//username and password
export async function fetchUserToken(requestedUser) {
  try {
    const response = await apiClient.post('/token', requestedUser) //TODO: response needs to be either a token or null
    return response
  } catch (error) {
    throw new Error('There was an error while fetching user information: ' + error.response)
  }
}

//Attempts to create a new user with the given username and password based on the client's input
export async function registerUser(userCredentials) {
  try {
    const response = await apiClient.post('/register', userCredentials) //TODO: response needs to be either a token or null
    return response
  } catch (error) {
    throw new Error('There was an error while creating user: ' + error.response)
  }
}

//Gets the information associated with the logged in username
export async function fetchUserInfo(username) {
  //TODO: use when changing password etc.
  try {
    const response = await apiClient.get('/' + username)
    return response
  } catch (error) {
    throw new Error(
      'There was an error while fetching user information: ' + error.response.statusText
    )
  }
}
