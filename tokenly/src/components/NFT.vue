<script setup>
import '../assets/css/nft.css'
import '@fortawesome/fontawesome-free/css/all.css'
import picon1 from '../assets/img/profile_icons/picon1.jpg'
import { useItemsStore } from '@/stores/ItemsStore.js'
import { useUserStore } from '@/stores/UserStore.js'
import { addToFavorites, removeItemFromFavorites, fetchAllFavorites } from '@/services/FavoritesService.js'
import { useFavoritesStore } from '@/stores/FavoritesStore.js'
import { fetchItemById } from '@/services/ItemService.js'
import { ref, onMounted } from 'vue'
import router from '../router'

const favoritesStore = useFavoritesStore()

const itemsStore = useItemsStore()
 
const userStore = useUserStore()

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const targetItems = itemsStore.getItems
let targetFavorites = favoritesStore.getFavorites
var item = null

// Check if the item is in the favorites store
const isFavorite = ref(false)

// Update the favorites store when the component is mounted
onMounted(async () => {
  await fetchFavorites()
  console.log(isFavorite.value)
})

async function fetchFavorites() { //TODO UTIL
  const favorites = await fetchAllFavorites(userStore.username)
  favoritesStore.setFavorites(favorites.data)

  targetFavorites = favoritesStore.getFavorites
  for(let i = 0; i < targetFavorites.length; i++) {
    if(targetFavorites[i].itemId == id) {
      isFavorite.value = true
      break
    }
  }
}

// Get the item from the items store if it is there
for(let i = 0; i < targetItems.length; i++) {
  if(targetItems[i].itemId == id) {
    item = targetItems[i]
    break
  }
} 

//TODO: make method
if (!item) {
  for(let i = 0; i < targetFavorites.length; i++) {
  if(targetFavorites[i].itemId == id) {
    item = targetFavorites[i]
    break
  }
}
}

/** TODO: implement this
if (!item) {
  try {
    console.log("Fetching item from server" + id)
    const responseItem = await fetchItemById(id)
    item = responseItem.data
  } catch (error) {
    console.log(error)
    
    router.push('/')
  }
}
*/

//TODO: If the item is still not found, make a request to the server to get the item

let image = {
  filename:
    'http://localhost:8080/api/source/' + id,
  alt: 'Image displayed in the NFT card',
  title: item.itemName,
  description:
    item.description,
  price: item.maxPrice,
  bidPrice: item.minPrice
}

let user = {
  name: item.ownerName,
  image: picon1
}

//Image tilt on hover effect
const onMouseOver = (event) => {
  // make the image tilt a bit in 3d space when hovering over it, depending on the mouse position
  const x = event.offsetX
  const y = event.offsetY
  const width = event.target.offsetWidth
  const height = event.target.offsetHeight
  const xPercent = (x / width) * 100 * 4
  const yPercent = (-y / height) * 100 * 8
  event.target.style.transform = `perspective(1000px) rotateY(${
    (xPercent - 50) / 100
  }deg) rotateX(${(yPercent - 50) / 100}deg)`
}

// Reset the image tilt when the mouse leaves the image
const onMouseOut = (event) => {
  event.target.style.transform = 'none'
}

//Handle favorite click event, add or remove item from favorites
async function handleFavoriteClick() {
  await fetchFavorites()
  let isPresent = false

  const targetFavorites = favoritesStore.getFavorites

  for(let i = 0; i < targetFavorites.length; i++) {
    if(targetFavorites[i].itemId == id) {
      isPresent = true
      break
    }
  }
  if(isPresent) {
      const params = { "username": userStore.username, "itemId": id }
      await removeItemFromFavorites(params)
      isFavorite.value = false
  }
  else {
    const favorite = {
      "username": userStore.getUsername(),
      "itemId": id
    }
    try {
    await addToFavorites(favorite)
    isFavorite.value = true
    } catch (error) {
      console.log(error) //TODO: print?
    }
  }
}
</script>

<template>
  <div class="nft-wrapper">
    <div class="nft-container">
      <div class="nft-image-container">
        <img
          class="nft-image"
          :src="image.filename"
          :alt="image.alt"
          @mousemove="onMouseOver"
          @mouseout="onMouseOut"
        />
      </div>
      <div class="buttons">
        <div class="buy-buttons-row">
          <button class="buy-button">
            <p>{{ $t('Bid') }}</p>
            <div class="price">
              {{ image.bidPrice }}
              <i class="fab fa-ethereum"></i>
            </div>
          </button>
          <button class="buy-button">
            <p>{{ $t('Buy') }}</p>
            <div class="price">
              {{ image.price }}
              <i class="fab fa-ethereum"></i>
            </div>
          </button>
        </div>
        <button class="favourite-button" @click="handleFavoriteClick()">
          <i class="far fa-heart" v-if="!isFavorite"></i>
          <i class="fas fa-heart" v-else></i>
        </button>
      </div>
      <h1 class="nft-title">{{ image.title }}</h1>
      <p class="nft-description">{{ image.description }}</p>
      <div class="user-tag">
        <img :src="user.image" :alt="user.name" />
        <div class="user-tag-info">
          <p class="user-tag-name">
            {{ user.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
