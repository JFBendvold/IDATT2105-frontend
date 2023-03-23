<script setup>
import '@/assets/css/discover/categorySelector.css'
import CategoryButton from './CategoryButton.vue'
</script>

<template>
  <div class="category-selector">
    <div class="category-wrapper">
      <div class="category-row">
        <CategoryButton category="Photography" />
        <CategoryButton category="Animation" />
        <CategoryButton category="Wallpaper" />
        <CategoryButton category="Animal" />
      </div>
      <div class="category-row">
        <CategoryButton category="People" />
        <CategoryButton category="Cartoon" />
        <CategoryButton category="Art" />
        <CategoryButton category="Collectibles" />
      </div>
    </div>
  </div>
</template>
