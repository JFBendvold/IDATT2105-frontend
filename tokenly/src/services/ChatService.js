import axios from 'axios'
import { toRaw } from 'vue'
import { useUserStore } from '@/stores/UserStore.js'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

/**
 * Retrieves the chats associated with the given username
 * @param {string} username - The username of the user who's chats are being requested
 * @returns {Promise} - Promise object represents the response from the server
 */  
export async function fetchChats(username) {
    try {
        const response = await apiClient.get('chats/' + username)

        return response
    } catch (error) {
        throw new Error('There was an error while fetching chats: ' + error.response)
    }
}

/**
 * Retrieves the messages associated with the given chatId
 * @param {string} chatId - The chatId of the chat whose messages are being requested
 * @returns {Promise} - Promise object represents the response from the server
 * @throws {Error} - Throws an error if there was an error while fetching messages
*/
export async function fetchMessages(chatId) {
    try {
        const response = await apiClient.get('messages/chats/' + chatId)
        return response
    } catch (error) {
        throw new Error('There was an error while fetching messages: ' + error.response)
    }
}

export async function sendMessage(chatId, message) {
    try {
        const response = await apiClient.post('messages/post', {
            chatId: chatId,
            message: message,
            senderName: useUserStore().username
            })
        return response
    } catch (error) {
        throw new Error('There was an error while sending message: ' + error.response)
    }
}

export async function markAsSeen(chatId) {
    try {
        const response = await apiClient.put('chats/seen/' + chatId)
        return response
    } catch (error) {
        throw new Error('There was an error while marking messages as seen: ' + error.response)
    }
}