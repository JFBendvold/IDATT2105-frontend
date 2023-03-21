import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/messages',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

//Retrieves the logged in users' message history
export async function fetchUserMessageHistory(userId) {
  try {
    const response = await apiClient.get('/history/' + userId)
    return response
  } catch (error) {
    throw new Error(
      'There was an error while fetching user message history: ' + error.response.statusText
    )
  }
}

//Retrieves the messages of a given chat
export async function fetchChat(requestedChat) {
  try {
    const response = await apiClient.get(
      '/chat/' + requestedChat.chatId + '/' + requestedChat.userId
    )
    return response
  } catch (error) {
    throw new Error('There was an error while fetching chat history: ' + error.response.statusText)
  }
}

//Posts a message to the given chat
export async function postMessage(requestedChat, message) {
  try {
    const response = await apiClient.post(
      '/chat/' + requestedChat.chatId + '/' + requestedChat.userId,
      message
    )
    return response
  } catch (error) {
    throw new Error('There was an error while posting message: ' + error.response.statusText)
  }
}
