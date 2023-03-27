<script setup>
import '@/assets/css/discover/nftTable.css'
import NFTTableHeader from './NFTTableHeader.vue'
import { RouterLink } from 'vue-router'
import { useItemsStore } from '@/stores/ItemsStore.js'
import { computed, onMounted, ref } from 'vue'
import { fetchAllItems } from '@/services/ItemService.js'
import { storeToRefs } from 'pinia'
import { imageTableFormat } from '@/utils/ImageListFormatter.js'

const items = ref([])
const nfts = ref([])
const page = ref(1)

function nextPage() {
  if (items.value.length < 6) {
    return
  }

  page.value++
  updateNFTs()
}

function prevPage() {
  if (page.value > 1) {
    page.value--
    updateNFTs()
  }
}

onMounted(async () => {
  updateNFTs()
})

const applyFilters = (filter) => {
  updateNFTs(filter)
}

async function updateNFTs(filter) {
  if (filter === undefined) {
    filter = {
      page: page.value-1,
      size: 6
    }
  }

  if (filter.page === undefined) {
    filter.page = page.value-1
  }

  if (filter.size === undefined) {
    filter.size = 6
  }

  if (filter.sortBy === undefined) {
    filter.sortBy = "visits"
  } else if (filter.sortBy === 'Newest') {
    filter.sortBy = 'publication_time'
  } else if (filter.sortBy === 'Price') {
    filter.sortBy = 'max_price'
  } else if (filter.sortBy === 'Oldest') {
    filter.sortBy = 'publication_time'
    filter.order = 'asc'
  } else if (filter.sortBy === 'Trending') {
    filter.sortBy = 'visits'
  } else if (filter.sortBy === 'Sort by') {
    filter.sortBy = 'visits'
  }

  console.log(filter)

  let response = await fetchAllItems(filter)
  items.value = response.data

  nfts.value = imageTableFormat(items.value)
}

</script>

<template>
  <NFTTableHeader @apply-filters="applyFilters" />
  <div class="nft-table">
    <div class="nft-table-row header-row">
      <div class="nft-table-cell nft-table-cell-title">Title</div>
      <div class="nft-table-cell nft-table-cell-description">Description</div>
      <div class="nft-table-cell nft-table-cell-image">Image</div>
      <div class="nft-table-cell nft-table-cell-listed">Date Published</div>
      <div class="nft-table-cell nft-table-cell-bid-price">Bid Price</div>
      <div class="nft-table-cell nft-table-cell-buy-price">Buy Price</div>
      <div class="nft-table-cell nft-table-cell-categories">Categories</div>
    </div>
    <div v-for="nft in nfts" :key="nft.title" class="nft-table-row item">
      <RouterLink :to="'/nft?id=' + nft.id">
        <div class="nft-table-cell nft-table-cell-title">{{ nft.title }}</div>
        <div class="nft-table-cell nft-table-cell-description">{{ nft.description }}</div>
        <div class="nft-table-cell nft-table-cell-image">
          <img :src="nft.image" alt="NFT Image" height="100" width="100" />
        </div>
        <div class="nft-table-cell nft-table-cell-listed">{{ nft.listed }}</div>
        <div class="nft-table-cell nft-table-cell-bid-price">
          {{ nft.bidPrice }}<i class="fab fa-ethereum"></i>
        </div>
        <div class="nft-table-cell nft-table-cell-buy-price">
          {{ nft.buyPrice }}<i class="fab fa-ethereum"></i>
        </div>
        <div class="nft-table-cell nft-table-cell-categories">
          <div v-for="category in nft.categories" :key="category" class="nft-table-category">
            {{ category }}
          </div>
        </div>
      </RouterLink>
    </div>
    <div class="page-buttons">
      <button class="page-button" @click="prevPage">
        <i class="fas fa-arrow-left"></i>
      </button>
      <p class="page-number">{{ page }}</p>
      <button class="page-button" @click="nextPage">
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>
