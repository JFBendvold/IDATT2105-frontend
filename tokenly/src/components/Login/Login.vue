<script setup>
import { RouterLink } from 'vue-router'
import '../../assets/css/login/login.css'
import { useUserStore } from '@/stores/UserStore.js'

let error = ''

const userStore = useUserStore()

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
    <RouterLink to="/">
      <h1>tokenly</h1>
    </RouterLink>
    <div class="login">
      <form @submit.prevent="userStore.logUserIn(username, password)">
        <input type="text" placeholder="Username" v-model="username"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <button type="submit">Login</button>
        <p class="error" v-if="error">{{ error }}</p>
      </form>
      <p>
        Don't have an account?
        <RouterLink to="/signup"> Sign up </RouterLink>
      </p>
    </div>
  </div>
</template>
