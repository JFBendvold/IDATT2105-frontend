<script setup>
import { RouterLink } from 'vue-router'
import '../../assets/css/home/welcome.css'
import '@fortawesome/fontawesome-free/css/all.css'
</script>

<template>
  <div class="welcome">
    <div class="title">
      <h1>
        {{ $t('Info') }}
      </h1>
      <p>
        {{ $t('Create Account') }}
      </p>
      <RouterLink to="/login">
        <button class="register">
          {{ $t('Join') }}
        </button>
      </RouterLink>
    </div>
    <div class="background-fade"></div>
  </div>
</template>
