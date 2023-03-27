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
    const response = await apiClient.post('itemListing/post', item)
    return response
  } catch (error) {
    throw new Error('There was an error while posting a new item: ' + error)
  }
}

export async function fetchAllItems(filter) {
  if (filter === undefined) {
    filter = {}
  }

  if (filter.size === undefined) {
    filter.size = 6
  }

  if (filter.sortBy === undefined) {
    filter.sortBy = 'visits'
  }

  if (filter.page === undefined) {
    filter.page = 0
  }

  if (filter.order === undefined) {
    filter.order = 'desc'
  }

  if (filter.minPrice === undefined) {
    filter.minPrice = 0
  }

  if (filter.maxPrice === undefined) {
    filter.maxPrice = 1000000
  }

  if (filter.category === undefined) {
    filter.category = ''
  } else if (filter.category == '') {
    filter.category = ''
  } else {
    try {
        const response = await apiClient.get('itemListing/category?size=' + filter.size + '&sortBy=' + filter.sortBy + '&page=' + filter.page + '&order=' + filter.order + '&minPrice=' + filter.minPrice + '&maxPrice=' + filter.maxPrice + '&category=' + filter.category)
        return response
    } catch (error) {
        throw new Error('There was an error while getting all items: ' + error)
    }
  }

  try {
    const response = await apiClient.get('itemListing/?size=' + filter.size + '&sortBy=' + filter.sortBy + '&page=' + filter.page + '&order=' + filter.order + '&minPrice=' + filter.minPrice + '&maxPrice=' + filter.maxPrice)
    return response
  } catch (error) {
    throw new Error('There was an error while getting all items: ' + error)
  }
}

export async function fetchAllItemsByCategory(category) {
  try {
    const response = await apiClient.get('itemListing/category?size=6&category=' + category)
    return response
  } catch (error) {
    throw new Error('There was an error while getting all items: ' + error)
  }
}

export async function fetchItemsByOwner(ownerName) {
  try {
    const response = await apiClient.get('itemListing/owner?username=' + ownerName + '&size=1000')
    return response
  } catch (error) {
    throw new Error('There was an error while getting all items belonging to the user: ' + error)
  }
}

export async function fetchItemById(itemId) {
  try {
    const response = await apiClient.get('itemListing/item/' + itemId)
    return response
  } catch (error) {
    throw new Error('There was an error while getting all items belonging to the user: ' + error)
  }
}

export async function addVisitById(itemId) {
  try {
    const response = await apiClient.put('listings/visits/' + itemId)
    return response
  } catch (error) {
    throw new Error('There was an error while adding a visit to the item: ' + error)
  }
}

export async function fetchItemCategories(itemId) {
  try {
    const response = await apiClient.get('itemsCategories/categories/' + itemId)
    return response
  } catch (error) {
    throw new Error('There was an error while getting all item categories: ' + error)
  }
}
