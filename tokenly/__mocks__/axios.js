// __mocks__/axios.js

const mockResponse = {
    data: {},
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  }
  
  export default {
    get: jest.fn().mockResolvedValue(mockResponse),
    post: jest.fn().mockResolvedValue(mockResponse),
    put: jest.fn().mockResolvedValue(mockResponse),
    delete: jest.fn().mockResolvedValue(mockResponse),
  }
  