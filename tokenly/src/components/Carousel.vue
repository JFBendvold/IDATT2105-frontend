<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Autoplay } from 'swiper'
import { RouterLink } from 'vue-router'
import 'swiper/swiper-bundle.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '../assets/css/carousel.css'
import { useItemsStore } from '@/stores/ItemsStore.js'
import { ref, computed, onMounted  } from 'vue'
import { fetchAllItems } from '@/services/ItemService.js'
import { storeToRefs } from 'pinia'
import imageListFormat from '@/utils/ImageListFormatter'

const itemsStore = useItemsStore()

const { items, newItems } = storeToRefs(itemsStore) //TODO: use NewItems

async function fetchItems() {
  const tempItems = await fetchAllItems()
  itemsStore.setItems(tempItems.data)
}

onMounted(async () => {
  itemsStore.resetItems
  await fetchItems()
})

let images = computed(() => {
  return imageListFormat(items.value)
})

SwiperCore.use([Autoplay])

const slidesPerView = ref("4")

//If the screen is less than 768px, the number of slides displayed should be 2
if (window.innerWidth < 768) {
  slidesPerView.value = "2"
}

</script>

<template>
  <div class="swiper">
    <swiper 
    :slides-per-view="slidesPerView"
    :autoplay="{ delay: 5000 }" 
    loop
    >
      <swiper-slide v-for="(image, index) in images" :key="index">
        <RouterLink :to="image.link">
          <div class="swiperImg" :style="{ backgroundImage: `url('${image.filename}'` }">
            <div class="swiperImg_overlay">
              <div class="swiperImg__title">{{ image.title }}</div>
              <div class="swiperImg__price">
                {{ image.price }}
                <i class="fab fa-ethereum"></i>
              </div>
            </div>
          </div>
        </RouterLink>
      </swiper-slide>
    </swiper>
  </div>
</template>
