<script setup>
import { RouterLink } from 'vue-router'
import '../../assets/css/login/login.css'
import { useUserStore } from '@/stores/UserStore.js'


</script>

<script>
const userStore = useUserStore()

export default {
  data() {
    return {
      error: '',
      username: null,
      password: null
    }
  },
  methods: {
    async handleSubmit() {
      try {
        await userStore.logUserIn(this.username, this.password)
      } catch (error) {
        this.error = error.message
      }
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
      <form @submit.prevent="handleSubmit()">
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
