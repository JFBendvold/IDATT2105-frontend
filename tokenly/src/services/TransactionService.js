import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/transactions',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export async function doTransaction(transaction) {
  try {
    const response = await apiClient.post('/transaction', transaction)
    return response
  } catch (error) {
    throw new Error('There was an error while posting transaction: ' + error.response.statusText)
  }
}
