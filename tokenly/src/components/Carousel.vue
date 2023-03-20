<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Autoplay } from 'swiper'
import { RouterLink } from 'vue-router'
import 'swiper/swiper-bundle.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '../assets/css/carousel.css'

SwiperCore.use([Autoplay])

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      images: [
        {
          filename:
            'https://images.unsplash.com/photo-1676501334781-30ac3973dbef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
          alt: 'Image 1',
          title: 'Image 1',
          price: '10',
          link: 'placeholder'
        },
        {
          filename:
            'https://images.unsplash.com/photo-1678446332674-27e494ebe44e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
          alt: 'Image 2',
          title: 'Image 2',
          price: '20',
          link: 'placeholder'
        },
        {
          filename:
            'https://images.unsplash.com/photo-1676501334781-30ac3973dbef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
          alt: 'Image 3',
          title: 'Image 3',
          price: '30',
          link: 'placeholder'
        },
        {
          filename:
            'https://images.unsplash.com/photo-1678446332674-27e494ebe44e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
          alt: 'Image 2',
          title: 'Image 2',
          price: '20',
          link: 'placeholder'
        },
        {
          filename:
            'https://images.unsplash.com/photo-1676501334781-30ac3973dbef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
          alt: 'Image 1',
          title: 'Image 1',
          price: '10',
          link: 'placeholder'
        },
        {
          filename:
            'https://images.unsplash.com/photo-1678446332674-27e494ebe44e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
          alt: 'Image 2',
          title: 'Image 2',
          price: '20',
          link: 'placeholder'
        },
        {
          filename:
            'https://images.unsplash.com/photo-1676501334781-30ac3973dbef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
          alt: 'Image 3',
          title: 'Image 3',
          price: '30',
          link: 'placeholder'
        },
        {
          filename:
            'https://images.unsplash.com/photo-1678446332674-27e494ebe44e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
          alt: 'Image 2',
          title: 'Image 2',
          price: '20',
          link: 'placeholder'
        }
      ]
    }
  }
}
</script>

<template>
  <div class="swiper">
    <swiper slides-per-view="4" :autoplay="{ delay: 5000 }" loop>
      <swiper-slide v-for="(image, index) in images" :key="index">
        <RouterLink :to="image.link">
          <div class="swiperImg" :style="{ backgroundImage: `url('${image.filename}'` }">
            <div class="swiperImg__title">{{ image.title }}</div>
            <div class="swiperImg__price">
              {{ image.price }}
              <i class="fab fa-ethereum"></i>
            </div>
          </div>
        </RouterLink>
      </swiper-slide>
    </swiper>
  </div>
</template>
