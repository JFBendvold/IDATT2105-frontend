<script setup>
import '@/assets/css/discover/nftTableHeader.css'
import { ref } from 'vue'

const showOrderDropdown = ref(false)
const showStatusDropdown = ref(false)
const showCategoryDropdown = ref(false)

const orderDropdownText = ref('Sort by')
const statusDropdownText = ref('Status')

const categorySuggestion = ref('')

let selectedCategories = []
let categories = [
  'Art',
  'Music',
  'Sports',
  'Gaming',
  'Collectibles',
  'Fashion',
  'Photography',
  'Animals',
  'Food',
  'Travel',
  'Science',
  'Technology',
  'Politics',
  'Business',
  'Education',
  'Entertainment',
  'Other'
]

const toggleDropdown = (dropdown, filter) => {
  if (dropdown === 'order') {
    orderDropdownText.value = filter
  } else if (dropdown === 'status') {
    statusDropdownText.value = filter
  }
}

const removeCategory = (category) => {
  selectedCategories = selectedCategories.filter((c) => c !== category)
  showCategoryDropdown.value = false
}

const addCategory = (category) => {
  showCategoryDropdown.value = false
  if (selectedCategories.includes(category)) {
    return
  }
  selectedCategories.push(category)
}

const suggestCategoryInput = (event) => {
  const input = event.target.value
  if (input.length === 0) {
    categorySuggestion.value = ''
    return
  }
  const suggestedCategory = categories.find((c) => c.toLowerCase().startsWith(input.toLowerCase()))
  if (suggestedCategory) {
    categorySuggestion.value = suggestedCategory
  }
}

const applyFilters = () => {
  console.log('Apply Filters')
}
</script>

<template>
  <div class="nft-table-header" id="items">
    <div class="filters">
      <div class="left">
        <button class="filter-text-button">Trending</button>
        <button class="filter-text-button">Newly Listed</button>
      </div>
      <div class="right">
        <div class="filter-price">
          <div class="filter-price-inputs">
            <input type="text" placeholder="Min Price" size="8" />
            <i class="fab fa-ethereum"></i>
            <input type="text" placeholder="Max Price" size="8" />
            <i class="fab fa-ethereum"></i>
          </div>
        </div>
        <div class="filter-text-button">
          <span @click="showCategoryDropdown = !showCategoryDropdown">
            Categories ({{ selectedCategories.length }})
          </span>
          <span
            class="filter-text-button-icon"
            @click="showCategoryDropdown = !showCategoryDropdown"
          >
            <i class="fas fa-chevron-down" v-if="!showCategoryDropdown"></i>
            <i class="fas fa-chevron-up" v-if="showCategoryDropdown"></i>
          </span>
          <div class="filter-text-button-dropdown" v-if="showCategoryDropdown">
            <div class="filter-text-button-dropdown-item">
              <input
                type="text"
                placeholder="Enter Category"
                class="filter-text-button-dropdown-item-input"
                @keyup.enter="addCategory($event.target.value)"
                @keyup="suggestCategoryInput($event)"
              />
              <span
                v-if="categorySuggestion.length > 0"
                class="filter-text-button-dropdown-item-suggestion"
                @click="addCategory(categorySuggestion)"
              >
                {{ categorySuggestion }}
              </span>
            </div>
            <div
              class="filter-text-button-dropdown-item"
              v-for="category in selectedCategories"
              :key="category"
              @click="removeCategory(category)"
            >
              <span>{{ category }}</span>
              <i class="fas fa-times"></i>
            </div>
          </div>
        </div>
        <div class="filter-text-button" @click="showStatusDropdown = !showStatusDropdown">
          <span>
            {{ statusDropdownText }}
          </span>
          <span class="filter-text-button-icon">
            <i class="fas fa-chevron-down" v-if="!showStatusDropdown"></i>
            <i class="fas fa-chevron-up" v-if="showStatusDropdown"></i>
          </span>
          <div class="filter-text-button-dropdown" v-if="showStatusDropdown">
            <div
              class="filter-text-button-dropdown-item"
              @click="toggleDropdown('status', 'Listed')"
            >
              <span>Listed</span>
            </div>
            <div
              class="filter-text-button-dropdown-item"
              @click="toggleDropdown('status', 'Not Listed')"
            >
              <span>Not Listed</span>
            </div>
            <div class="filter-text-button-dropdown-item" @click="toggleDropdown('status', 'Both')">
              <span>Both</span>
            </div>
          </div>
        </div>
        <div class="filter-text-button" @click="showOrderDropdown = !showOrderDropdown">
          <span>
            {{ orderDropdownText }}
          </span>
          <span class="filter-text-button-icon">
            <i class="fas fa-chevron-down" v-if="!showOrderDropdown"></i>
            <i class="fas fa-chevron-up" v-if="showOrderDropdown"></i>
          </span>
          <div class="filter-text-button-dropdown" v-if="showOrderDropdown">
            <div class="filter-text-button-dropdown-item" @click="toggleDropdown('order', 'Price')">
              <span>Price</span>
            </div>
            <div class="filter-text-button-dropdown-item" @click="toggleDropdown('order', 'Title')">
              <span>Title</span>
            </div>
            <div
              class="filter-text-button-dropdown-item"
              @click="toggleDropdown('order', 'Newest')"
            >
              <span>Newest</span>
            </div>
            <div
              class="filter-text-button-dropdown-item"
              @click="toggleDropdown('order', 'Oldest')"
            >
              <span>Oldest</span>
            </div>
          </div>
        </div>
        <button class="apply-filters-button" @click="applyFilters">Apply Filters</button>
      </div>
    </div>
  </div>
</template>
