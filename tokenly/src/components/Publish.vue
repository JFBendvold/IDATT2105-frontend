<script setup>
import '@/assets/css/publish.css'
import { RouterLink } from 'vue-router'
import Title from '../components/Title.vue'
import { ref } from 'vue'

const categorySuggestion = ref('')
const showCategories = ref(false)
const upload = ref(null)
const uploadedFile = ref(null)
const listed = ref(false)
const errorMsg = ref('')

const title = ref('')
const description = ref('')
const bidStartPrice = ref('')
const buyNowPrice = ref('')
const selectedCategories = ref([])

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

const addCategory = (category) => {
  if (selectedCategories.value.includes(category)) {
    return
  }
  selectedCategories.value.push(category)
  showCategories.value = true
  showCategories.value = false
}

const removeCategory = (category) => {
  selectedCategories.value = selectedCategories.value.filter((c) => c !== category)
  showCategories.value = false
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

const uploadFile = (event) => {
  //Check if file is image
  if (!event.target.files[0].type.startsWith('image/')) {
    alert('File is not an image')
    return
  }

  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      //const preview = document.querySelector('.publish-upload-preview img')
      uploadedFile.value = e.target.result
      //preview.src = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const publish = () => {
  if (title.value.length === 0) {
    errorMsg.value = 'Title is required'
    return
  }
  if (description.value.length === 0) {
    errorMsg.value = 'Description is required'
    return
  }
  if (selectedCategories.value.length === 0) {
    errorMsg.value = 'At least one category is required'
    return
  }
  if (uploadedFile.value === null) {
    errorMsg.value = 'File is required'
    return
  }
  if (listed.value) {
    if (bidStartPrice.value.length === 0) {
      errorMsg.value = 'Starting bid is required'
      return
    }
    if (buyNowPrice.value.length === 0) {
      errorMsg.value = 'Buy now price is required'
      return
    }
  }

  errorMsg.value = ''
  console.log('Publishing')

  const mainData = {
    title: title.value,
    description: description.value,
    categories: selectedCategories.value,
    file: uploadedFile.value
  }

  console.log(mainData)

  const listingData = {
    listed: listed.value,
    bidStartPrice: bidStartPrice.value,
    buyNowPrice: buyNowPrice.value
  }

  console.log(listingData)
}
</script>

<template>
  <div class="publish-container">
    <Title title="Publish" />
    <div class="publish-wrapper">
      <form @submit.prevent="publish">
        <input type="text" :placeholder="$t('Title')" class="publish-title" v-model="title" />
        <textarea :placeholder="$t('Description')" v-model="description"></textarea>
        <input
          type="file"
          accept="image/*"
          ref="upload"
          class="publish-file"
          @change="uploadFile($event)"
          v-if="uploadedFile === null"
        />
        <button
          class="publish-upload-button"
          @click="$refs.upload.click()"
          v-if="uploadedFile === null"
        >
          {{ $t('Upload') }}
        </button>
        <div class="publish-upload-preview" v-if="uploadedFile">
          <img :src="uploadedFile" />
        </div>
        <div class="publish-categories">
          <input
            type="text"
            :placeholder="$t('Enter Category')"
            class="publish-category-input"
            @keyup.enter="addCategory($event.target.value)"
            @keyup="suggestCategoryInput($event)"
          />
          <span
            v-if="categorySuggestion.length > 0"
            class="publish-category-suggestion"
            @click="addCategory(categorySuggestion)"
          >
            {{ categorySuggestion }}
          </span>
        </div>
        <button
          class="show-categories-button"
          @click="showCategories = !showCategories"
          v-if="!showCategories"
        >
          {{ $t('Show Categories') }}
          ({{ selectedCategories.length }})
        </button>
        <button
          class="show-categories-button"
          @click="showCategories = !showCategories"
          v-if="showCategories"
        >
          {{ $t('Hide Categories') }}
          ({{ selectedCategories.length }})
        </button>
        <div class="publish-selected-categories" v-if="showCategories">
          <span
            v-for="category in selectedCategories"
            class="publish-selected-category"
            @click="removeCategory(category)"
          >
            {{ category }}
          </span>
        </div>
        <div class="listed-options">
          <input type="checkbox" id="listed" v-model="listed" />
          <label for="listed"> 
             {{ $t('For sale') }}
          </label>
          <div class="listed-options-wrapper" v-if="listed">
            <div class="row">
              <input
                type="text"
                :placeholder="$t('Starting bid')"
                name="starting-bid"
                v-model="bidStartPrice"
              />
              <i class="fab fa-ethereum"></i>
            </div>
            <div class="row">
              <input
                type="text"
                :placeholder="$t('Buy now price')"
                name="buy-now-price"
                v-model="buyNowPrice"
              />
              <i class="fab fa-ethereum"></i>
            </div>
          </div>
        </div>
        <p class="publish-terms">
          {{ $t('By publishing, you agree to our') }} <RouterLink to="/terms"> 
            {{ $t('Terms of Service') }}
          </RouterLink> {{ $t('and') }}
          <RouterLink to="/privacy">
            {{ $t('Privacy Policy') }}
          </RouterLink>
        </p>
        <button type="submit">
          {{ $t('Publish') }}
        </button>
        <p class="publish-error" v-if="errorMsg.length > 0">
          {{ errorMsg }}
        </p>
      </form>
    </div>
  </div>
</template>
