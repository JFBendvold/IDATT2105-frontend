<script setup>
import '../assets/css/nft.css'
import '@fortawesome/fontawesome-free/css/all.css'
import picon1 from '../assets/img/profile_icons/picon1.jpg'
import { useItemsStore } from '@/stores/ItemsStore.js'

const itemsStore = useItemsStore()

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const targetItems = itemsStore.getItems
var item = null

for(let i = 0; i < targetItems.length; i++) {
  if(targetItems[i].itemId == id) {
    item = targetItems[i]
  }
}

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

const onMouseOut = (event) => {
  event.target.style.transform = 'none'
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
        <button class="favourite-button">
          <i class="far fa-heart"></i>
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
