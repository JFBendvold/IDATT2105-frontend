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
    const response = await apiClient.post('/login', requestedUser) //TODO: response needs to be either a token or null
    return response
  } catch (error) {
    throw new Error(
      'There was an error while fetching user information: ' + error.response.statusText
    )
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
