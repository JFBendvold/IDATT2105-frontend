import axios from 'axios'
import { createBid, fetchBid } from '@/service/BidService.js'
import { useUserStore } from '@/stores/UserStore.js'

jest.mock('axios')

describe('My test', () => {
  let userStoreMock

  beforeEach(() => {
    userStoreMock = useUserStore()
    userStoreMock.setUser({ id: 123 }) // Mock user ID for authenticated requests
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should create a bid', async () => {
    const mockResponse = { data: { id: 1, name: 'Test Bid' } }

    axios.create.mockImplementation(() => ({
      post: jest.fn().mockResolvedValue(mockResponse)
    }))

    const bid = { name: 'Test Bid', amount: 100 }
    const response = await createBid(bid)

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:8080/api/bids',
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    expect(response).toEqual(mockResponse)
  })

  it('should fetch a bid', async () => {
    const mockResponse = { data: { id: 1, name: 'Test Bid' } }

    axios.create.mockImplementation(() => ({
      get: jest.fn().mockResolvedValue(mockResponse)
    }))

    const bidId = 1
    const response = await fetchBid(bidId)

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:8080/api/bids',
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    expect(response).toEqual(mockResponse)
  })
})