<script setup>
import { RouterLink } from 'vue-router'
import '../../assets/css/login/signup.css'
import { useUserStore } from '@/stores/UserStore.js'

let error = ''

const userStore = useUserStore()

</script>

<script>
  export default {
    data() {
      return {
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        email: null
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
      <form @submit.prevent="userStore.createUserProfile(username, password, firstName, lastName, email)">
        <div>
          <input type="text" placeholder="First Name" v-model="firstName"/>
          <input type="text" placeholder="Last Name" v-model="lastName"/>
        </div>
        <input class="largeInput" type="text" placeholder="Username (min 6 characters)" v-model="username"/>
        <input class="largeInput" type="text" placeholder="Email" v-model="email"/>
        <div>
          <input type="password" placeholder="Password" v-model="password"/>
          <input type="password" placeholder="Confirm Password"/>
        </div>
        <button type="submit">Sign up</button>
        <p class="error" v-if="error">{{ error }}</p>
      </form>
      <p>
        Already have an account?
        <RouterLink to="/login"> Log in </RouterLink>
      </p>
    </div>
  </div>
</template>
