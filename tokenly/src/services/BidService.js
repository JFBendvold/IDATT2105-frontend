import axios from 'axios'
import { toRaw } from 'vue'
import { useUserStore } from '@/stores/UserStore.js'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/bids',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export async function createBid(bid) {
    try {
        const response = await apiClient.post('/bid', bid)
        return response
    } catch (error) {
        throw new Error('There was an error while creating bid: ' + error.response)
    }
}

export async function fetchBid(bidId) {
    try {
        const response = await apiClient.get('/bid/' + bidId)
        return response
    } catch (error) {
        throw new Error('There was an error while fetching bid: ' + error.response)
    }
}