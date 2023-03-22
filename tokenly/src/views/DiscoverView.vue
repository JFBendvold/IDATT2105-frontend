<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import CategorySelector from '../components/Discover/CategorySelector.vue'
import NFTTable from '../components/Discover/NFTTable.vue'
</script>

<template>
    <Header />
    <main>
        <CategorySelector />
        <div class="content">
            <NFTTable />
        </div>
    </main>
    <Footer />
</template>

<style scoped>
.content {
    height: 100vh;
    width: 100%;
    background-color: #F1F2F6;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 100px rgba(0, 0, 0, 0.5);
    margin-top: 100vh;
}
</style>