<script setup>
import { RouterLink } from 'vue-router'
import '../../assets/css/login/login.css'
import logo from '../../assets/img/logo.png'

let error = ''
</script>

<template>
  <div class="loginContainer">
    <RouterLink to="/" class="logo-container">
      <img src="@/assets/img/logo.png" alt="logo" />
      <h1>tokenly</h1>
    </RouterLink>
    <div class="login">
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
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
