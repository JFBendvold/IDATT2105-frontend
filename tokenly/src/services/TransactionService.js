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

/**
 * Fetches all transactions from the API
 * @returns List of transactions
 */
export async function getTransactions() {
  try {
    const response = await apiClient.get('/all')
    return response
  } catch (error) {
    throw new Error('There was an error while fetching transactions: ' + error.response.statusText)
  }
}
