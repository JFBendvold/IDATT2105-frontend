<script setup>
import '../assets/css/nft.css'
import '@fortawesome/fontawesome-free/css/all.css'
import picon1 from '../assets/img/profile_icons/picon1.jpg'

let image = {
  filename:
    'https://images.unsplash.com/photo-1676501334781-30ac3973dbef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
  alt: 'Image 1',
  title: 'Windows Explorer',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultricies, nisl nisl aliquam nisl, eget aliquam nisl nunc ut nisl. Sed euismod, nunc ut aliquam ultricies, nisl nisl aliquam nisl, eget aliquam nisl nunc ut nisl.',
  price: '10',
  bidPrice: '5'
}

let user = {
  name: 'JFBendvold',
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
            <p>Make a bid</p>
            <div class="price">
              {{ image.bidPrice }}
              <i class="fab fa-ethereum"></i>
            </div>
          </button>
          <button class="buy-button">
            <p>Buy now</p>
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
