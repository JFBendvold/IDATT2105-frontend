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

function convert(items) {
  if(!items) return []

  var imageArray = []
  console.log("Items length:", items.length)
  for (let i = 0; i < items.length; i++) {

  if(items[i].minPrice === undefined || items[i].maxPrice === undefined || items[i].listingId === undefined || items[i].publicationTime === null) { 
    let img = {
      filename: `http://localhost:8080/api/source/${items[i].itemId}`,
      alt: items[i].itemName,
      title: items[i].itemName,
      price: 'Not listed',
      link: 'nft?id=' + items[i].itemId 
    }

    /**
     *         {
          filename:
            'https://images.unsplash.com/photo-1676501334781-30ac3973dbef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
          alt: 'Image 1',
          title: 'Image 1',
          price: '10',
          link: 'nft'
        },
     */
    imageArray.push(img)
  } else {
    let img = {
      filename: `http://localhost:8080/api/source/${items[i].itemId}`,
      alt: items[i].itemName,
      title: items[i].itemName,
      price: items[i].maxPrice,
      link: 'nft?id=' + items[i].itemId
    }
    imageArray.push(img)
  }
}
  return imageArray
}

let images = computed(() => {
  return convert(items.value)
})

SwiperCore.use([Autoplay])

const slidesPerView = ref("4")

//If the screen is less than 768px, the number of slides displayed should be 2
if (window.innerWidth < 768) {
  slidesPerView.value = "2"
}

/*
const images = [
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
        },
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

          {
    filename:
      'https://images.unsplash.com/photo-1676501334781-30ac3973dbef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
    alt: 'Image 1',
    title: 'Image 1',
    price: '10',
    link: 'nft'
  },
]
*/
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
