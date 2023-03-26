<script setup>
import '@/assets/css/discover/nftTable.css'
import NFTTableHeader from './NFTTableHeader.vue'
import { RouterLink } from 'vue-router'
import { useItemsStore } from '@/stores/ItemsStore.js'
import { computed, onMounted } from 'vue'
import { fetchAllItems } from '@/services/ItemService.js'
import { storeToRefs } from 'pinia'


const itemsStore = useItemsStore()

async function fetchItems() {
  const items = await fetchAllItems()
  itemsStore.setItems(items.data)
}

onMounted(async () => {
  await fetchItems()
})

function convert(items) {

  var nftArray = []
  console.log("Items length:", items.length)
  for (let i = 0; i < items.length; i++) {

  if(items[i].minPrice === undefined || items[i].maxPrice === undefined || items[i].listingId === undefined || items[i].publicationTime === null) { 
    let nft = {
      title: items[i].itemName,
      description: items[i].description,
      image: `http://localhost:8080/api/source/${items[i].itemId}`,
      listed: 'Not listed',
      bidPrice: '0',
      buyPrice: '0',
      categories: '',
      id: items[i].itemId
    }
    nftArray.push(nft)
  } else {
    let nft = {
      title: items[i].itemName,
      description: items[i].description,
      image: `http://localhost:8080/api/source/${items[i].itemId}`, 
      listed: items[i].publicationTime.slice(0, 10),
      bidPrice: items[i].minPrice,
      buyPrice: items[i].maxPrice,
      categories: ['IMPLEMENT'],
      id: items[i].itemId
    }
    nftArray.push(nft)
  }
}
  return nftArray
}

const { items } = storeToRefs(itemsStore)

let nfts = computed(() => {
  return convert(items.value)
})
  /*
  {
    title: 'NFT Title',
    description: 'NFT Description',
    image: 'http://localhost:8080/api/source/2',
    listed: '2021-09-01',
    bidPrice: '0.1',
    buyPrice: '0.5',
    categories: ['Art', 'Music'],
    id: 1
  },
  {
    title: 'NFT Title 2',
    description: 'NFT Description 2',
    image: 'https://picsum.photos/200/300',
    listed: '2021-09-01',
    bidPrice: '0.1',
    buyPrice: '0.5',
    categories: ['Art', 'Sports', 'Music', 'Fashion', 'Art', 'Sports', 'Music', 'Fashion'],
    id: 1
  },
  {
    title: 'NFT Title 3',
    description: 'NFT Description 3',
    image: 'https://picsum.photos/200/300',
    listed: '2021-09-01',
    bidPrice: '0.1',
    buyPrice: '0.5',
    categories: ['Art', 'Music'],
    id: 1
  },
  {
    title: 'NFT Title 4',
    description: 'NFT Description 4',
    image: 'https://picsum.photos/200/300',
    listed: '2021-09-01',
    bidPrice: '0.1',
    buyPrice: '0.5',
    categories: ['Art', 'Music'],
    id: 69
  },
  {
    title: 'NFT Title 5',
    description: 'NFT Description 5',
    image: 'https://picsum.photos/200/300',
    listed: '2021-09-01',
    bidPrice: '0.1',
    buyPrice: '0.5',
    categories: ['Art', 'Music'],
    id: 1
  },
  {
    title: 'NFT Title 6',
    description: 'NFT Description 6',
    image: 'https://picsum.photos/200/300',
    listed: '2021-09-01',
    bidPrice: '0.1',
    buyPrice: '0.5',
    categories: ['Art', 'Music'],
    id: 1
  },
  {
    title: 'NFT Title 7',
    description: 'NFT Description 7',
    image: 'https://picsum.photos/200/300',
    listed: '2021-09-01',
    bidPrice: '0.1',
    buyPrice: '0.5',
    categories: ['Art', 'Music'],
    id: 1
  },
  {
    title: 'NFT Title 8',
    description: 'NFT Description 8',
    image: 'https://picsum.photos/200/300',
    listed: '2021-09-01',
    bidPrice: '0.1',
    buyPrice: '0.5',
    categories: ['Art', 'Music'],
    id: 1
  },
  {
    title: 'NFT Title',
    description: 'NFT Description',
    image: 'https://picsum.photos/200/300',
    listed: '2021-09-01',
    bidPrice: '0.1',
    buyPrice: '0.5',
    categories: ['Art', 'Music'],
    id: 1
  },
  {
    title: 'NFT Title 2',
    description: 'NFT Description 2',
    image: 'https://picsum.photos/200/300',
    listed: '2021-09-01',
    bidPrice: '0.1',
    buyPrice: '0.5',
    categories: ['Art', 'Sports', 'Music', 'Fashion', 'Art', 'Sports', 'Music', 'Fashion'],
    id: 1
  }
]
*/
</script>

<template>
  <NFTTableHeader />
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
      <RouterLink :to="'/nft?id='+nft.id">
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
  </div>
</template>
