<script setup>
import { RouterLink } from 'vue-router'
import '../../assets/css/login/login.css'
import logo from '../../assets/img/logo.png'

import { useUserStore } from '@/stores/UserStore.js'
const userStore = useUserStore()

let error = ''
</script>

<script>
export default {
  data() {
    return {
      username: null,
      password: null
    }
  }
}
</script>

<template>
  <div class="loginContainer">
    <RouterLink to="/" class="logo-container">
      <img src="@/assets/img/logo.png" alt="logo" />
      <h1>tokenly</h1>
    </RouterLink>
    <div class="login">
      <form @submit.prevent="userStore.tempLogUserIn(username, password)">
        <input type="text" :placeholder="$t('Username')" v-model="username" />
        <input type="password" :placeholder="$t('Password')" v-model="password" />
        <button type="submit">{{ $t('Login') }}</button>
        <p class="error" v-if="error">{{ error }}</p>
      </form>
      <p>
        {{ $t('Not registered?') }}
        <RouterLink to="/signup"> {{ $t('Sign up') }} </RouterLink>
      </p>
    </div>
  </div>
</template>
