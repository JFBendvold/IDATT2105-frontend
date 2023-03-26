<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import CategorySelector from '../components/Discover/CategorySelector.vue'
import NFTTable from '../components/Discover/NFTTable.vue'
import Chat from '../components/Chat/Chat.vue'
</script>

<template>
  <Header />
  <main>
    <CategorySelector />
    <div class="content" id="content">
      <NFTTable />
    </div>
  </main>
  <Chat />
  <Footer />
</template>

<style scoped>
.content {
  min-height: 100vh;
  width: 100%;
  background-color: #f1f2f6;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 0px 100px rgba(0, 0, 0, 0.5);
  margin-top: 100vh;
}
@media (max-width: 768px) {
  .content {
    margin-top: 0;
  }
}
</style>
