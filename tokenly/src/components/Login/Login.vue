<script setup>
import { RouterLink } from 'vue-router'
import '../../assets/css/login/login.css'

let error = ''
</script>

<template>
  <div class="loginContainer">
    <RouterLink to="/">
      <h1>tokenly</h1>
    </RouterLink>
    <div class="login">
      <form>
        <input type="text" :placeholder="$t('Username')" />
        <input type="password" :placeholder="$t('Password')" />
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
