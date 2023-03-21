<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import CategorySelector from '../components/Discover/CategorySelector.vue'
</script>

<template>
    <Header />
    <main>
        <CategorySelector />
        <div class="placeholder">
            <h1>Placeholder</h1>
        </div>
    </main>
    <Footer />
</template>

<style scoped>
.placeholder {
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