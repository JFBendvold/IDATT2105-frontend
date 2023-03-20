import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/users',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export async function fetchUserId(requestedUser) {
  try {
    const response = await apiClient.post('/login', requestedUser) //TODO: response needs to be either an id or null
    return response
  } catch (error) {
    throw new Error(
      'There was an error while fetching user information: ' + error.response.statusText
    )
  }
}

//TODO: use when changing password etc.
export async function fetchUserInfo(username) {
  try {
    const response = await apiClient.get('/' + username)
    return response
  } catch (error) {
    throw new Error(
      'There was an error while fetching user information: ' + error.response.statusText
    )
  }
}
