<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Title from '../components/Title.vue'
import Favorites from '../components/Favorites.vue'
</script>

<template>
  <Header />
  <main class="favorites-view">
    <Title title="Favorites" />
    <Favorites />
  </main>
  <Footer />
</template>

<style scoped>
.favorites-view {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 100px;
  background: linear-gradient(180deg, #758bfd 0%, #f1f2f6 100%);
}
</style>
