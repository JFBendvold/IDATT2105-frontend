import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

//Posts a new item
export async function postUserItem(item) {
  try {
  const response = await apiClient.post('items/post', item)
  return response
  } catch (error) {
    throw new Error('There was an error while posting a new item: ' + error)
  }
}

export async function fetchAllItems(){
  try {
  const response = await apiClient.get('itemListing/?size=100')
  return response
  } catch (error) {
    throw new Error('There was an error while getting all items: ' + error)
  }
}

export async function fetchNewestItems(){
  try {
  const response = await apiClient.get('itemListing/?size=6')
  return response
  } catch (error) {
    throw new Error('There was an error while getting all items: ' + error)
  }
}

export async function fetchAllItemsByCategory(category){
  try {
  const response = await apiClient.get('itemListing/category?size=6&category=' + category)
  return response
  } catch (error) {
    throw new Error('There was an error while getting all items: ' + error)
  }
}
