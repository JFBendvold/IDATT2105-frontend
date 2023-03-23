<script setup>
import "@/assets/css/publish.css";
import { RouterLink } from 'vue-router'
import Title from '../components/Title.vue'
import { ref } from 'vue'

const categorySuggestion = ref('')
const showCategories = ref(false)
const upload = ref(null)
const uploadedFile = ref(null)
const listed = ref(false)

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

const addCategory = (category) => {
    if (selectedCategories.includes(category)) {
        return
    }
    selectedCategories.push(category)
    showCategories.value = true
    showCategories.value = false
}

const removeCategory = (category) => {
    selectedCategories = selectedCategories.filter((c) => c !== category)
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
  console.log('publish')
}

</script>

<template>
    <div class="publish-container">
        <Title title="Publish" />
        <div class="publish-wrapper">
            <form @submit.prevent="publish">
            <input type="text" placeholder="Title" class="publish-title" />
            <textarea placeholder="Description"></textarea>
            <input 
            type="file"
            accept="image/*"
            ref="upload" 
            class="publish-file" 
            @change="uploadFile($event)" 
            v-if="uploadedFile === null" />
            <button class="publish-upload-button" @click="$refs.upload.click()" v-if="uploadedFile === null">
                Upload
            </button>
            <div class="publish-upload-preview" v-if="uploadedFile">
                <img :src="uploadedFile" />
            </div>
            <div class="publish-categories">
                <input
                type="text"
                placeholder="Enter Category"
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
            <button class="show-categories-button" @click="showCategories = !showCategories" v-if="!showCategories">
                Show Categories ({{ selectedCategories.length }})
            </button>
            <button class="show-categories-button" @click="showCategories = !showCategories" v-if="showCategories">
                Hide Categories ({{ selectedCategories.length }})
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
                    For sale
                </label>
                <div class="listed-options-wrapper" v-if="listed">
                    <div class="row">
                        <input type="text" placeholder="Starting Bid" />
                        <i class="fab fa-ethereum"></i>
                    </div>
                    <div class="row">
                        <input type="text" placeholder="Buy now price" />
                        <i class="fab fa-ethereum"></i>
                    </div>
                </div>
            </div>
            <p class="publish-terms">
                By publishing, you agree to our <RouterLink to="/terms">Terms of Service</RouterLink> and <RouterLink to="/privacy">Privacy Policy</RouterLink>
            </p>
            <button type="submit">Publish</button>
            </form>
        </div>
    </div>
</template>
