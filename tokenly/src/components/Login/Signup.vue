<script setup>
import { RouterLink } from 'vue-router'
import '../../assets/css/login/signup.css'
import { useUserStore } from '@/stores/UserStore.js'

</script>

<script>

const userStore = useUserStore()

  export default {
    data() {
      return {
        error: '',
        username: null,
        password: null,
        confirmPassword: null,
        firstName: null,
        lastName: null,
        email: null
      }
    },
    computed: {
      matchingPasswords() {
        return this.password === this.confirmPassword
      }
    },
    methods: {
      async handleSubmit() {
        if (this.matchingPasswords) {
          try {
            await userStore.createUserProfile(this.username, this.password, this.firstName, this.lastName, this.email)
          } catch (error) {
            this.error = error.message
          }
        } else {
          this.error = 'Passwords do not have matching values'
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
        <div>
          <input type="text" placeholder="First Name" v-model="firstName"/>
          <input type="text" placeholder="Last Name" v-model="lastName"/>
        </div>
        <input class="largeInput" type="text" placeholder="Username (min 6 characters)" v-model="username"/>
        <input class="largeInput" type="text" placeholder="Email" v-model="email"/>
        <div>
          <input type="password" placeholder="Password" v-model="password"/>
          <input type="password" placeholder="Confirm Password" v-model="confirmPassword"/>
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
