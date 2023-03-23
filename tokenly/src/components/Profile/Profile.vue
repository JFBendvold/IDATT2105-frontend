<script setup>
import "@/assets/css/profile/profile.css"
import { ref } from 'vue'
import picon1 from '@/assets/img/profile_icons/picon1.jpg'

// Get params from url
const params = new URLSearchParams(window.location.search)
const username = ref(params.get('username'))
const profilePic = ref(picon1)

</script>

<template>
    <div class="profile-container">
        <div class="profile-wrapper">
            <img class="profile-pic" :src="profilePic" alt="Profile Picture">
            <h1 class="profile-username">{{ username }}</h1>
        </div>
    </div>
</template>