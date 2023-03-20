<script setup>
import { RouterLink } from 'vue-router'
import '../../assets/css/login/signup.css'

let error = ''
</script>

<template>
  <div class="loginContainer">
    <RouterLink to="/">
      <h1>tokenly</h1>
    </RouterLink>
    <div class="login">
      <form>
        <div>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input class="largeInput" type="text" placeholder="Username (min 6 characters)" />
        <input class="largeInput" type="text" placeholder="Email" />
        <div>
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
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
