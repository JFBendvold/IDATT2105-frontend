<script setup>
import '@/assets/css/favorites.css'
import { RouterLink } from 'vue-router'
import Title from '@/components/Title.vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/FavoritesStore.js'
import imageListFormat from '@/utils/ImageListFormatter.js'
import { removeItemFromFavorites, fetchAllFavorites } from '@/services/FavoritesService.js'
import { useUserStore } from '@/stores/UserStore.js'

const favoritesStore = useFavoritesStore()
const userStore = useUserStore()

const { favorites } = storeToRefs(favoritesStore)

let nfts = computed(() => {
  return imageListFormat(favorites.value)
})

/*

let nfts = [
  {
    filename:
      'https://images.unsplash.com/photo-1676501334781-30ac3973dbef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
    alt: 'Image 1',
    title: 'Image 1',
    price: '10',
    link: 'nft'
  },
  {
    filename:
      'https://images.unsplash.com/photo-1678446332674-27e494ebe44e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    alt: 'Image 2',
    title: 'Image 2',
    price: '20',
    link: 'nft'
  },
  {
    filename:
      'https://images.unsplash.com/photo-1678537378341-f9a017d75515?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
    alt: 'Image 3',
    title: 'Image 3',
    price: '30',
    link: 'nft'
  },
  {
    filename:
      'https://images.unsplash.com/photo-1678446332674-27e494ebe44e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    alt: 'Image 2',
    title: 'Image 2',
    price: '20',
    link: 'nft'
  }
]
*/


async function fetchFavorites() { //TODO UTIL
  const favorites = await fetchAllFavorites(userStore.username)
  console.log(favorites.data)
  favoritesStore.setFavorites(favorites.data)
  
}

const removeFromFavorites = async (nft) => {
  const params = { "username": userStore.username, "itemId": nft.itemId }
  console.log(params)
  await removeItemFromFavorites(params)
  await fetchFavorites()
}
</script>

<template>
  <div class="favorites-wrapper">
    <Title title="Favorites" />
    <div class="favorites">
      <div class="favorites-empty" v-if="nfts.length === 0">
        <h2>{{ $t('No favorites') }}</h2>
        <p>
          {{ $t('No favorites text') }}
          <i class="fas fa-heart"></i>.
        </p>
      </div>
      <div class="favorites-grid" v-else>
        <div class="favorites-grid-item" v-for="nft in nfts" :key="nft.title">
          <div class="favorites-grid-item-image">
            <i class="fas fa-times remove-icon" @click="removeFromFavorites(nft)"></i>
            <img :src="nft.filename" :alt="nft.alt" />
          </div>
          <div class="favorites-grid-item-info">
            <h3>{{ nft.title }}</h3>
            <p>
              {{ nft.price }}
              <i class="fab fa-ethereum"></i>
            </p>
          </div>
          <div class="favorites-grid-item-link">
            <RouterLink :to="nft.link">
              <i class="fas fa-arrow-right"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
