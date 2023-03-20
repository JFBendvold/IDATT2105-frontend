<script setup>
import TheWelcome from '../components/Home/Welcome.vue'
import Carousel from '../components/Carousel.vue'
import Title from '../components/Title.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <Header />
  <main>
    <TheWelcome />
    <Title title="Trending Now" />
    <Carousel />
    <Title title="Newly Listed" />
    <Carousel />
  </main>
  <Footer />
</template>
