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
      email: null,
      birthDate: null
    }
  },
  computed: {
    matchingPasswords() {
      return this.password === this.confirmPassword
    },
    checkInputs() {
  const usernameValue = this.username.value.trim()
  const passwordValue = this.password.value.trim()
  const confirmPasswordValue = this.confirmPassword.value.trim()
  const firstNameValue = this.firstName.value.trim()
  const lastNameValue = this.lastName.value.trim()
  const emailValue = this.email.value.trim()
  const birthDateValue = this.birthDate.value.trim()

  if (usernameValue === '') {
    setErrorFor(username, 'Username cannot be blank')
  } else {
    return false
  }

  if (passwordValue === '') {
    setErrorFor(password, 'Password cannot be blank')
  } else {
    return false
  }

  if (confirmPasswordValue === '') {
    setErrorFor(confirmPassword, 'Confirm password cannot be blank')
  } else {
    return false
  }

  if (firstNameValue === '') {
    setErrorFor(firstName, 'First name cannot be blank')
  } else {
    return false
  }

  if (lastNameValue === '') {
    setErrorFor(lastName, 'Last name cannot be blank')
  } else {
    return false
  }

  if (emailValue === '') {
    setErrorFor(email, 'Email cannot be blank')
  } else {
    return false
  }

  if (birthDateValue === '') {
    setErrorFor(birthDate, 'Birth date cannot be blank')
  } else {
    return false
  }

  return true
}
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.checkInputs) {
        return
        }
      } catch (error) {
        this.error = "Please fill in all fields"
        return
      }

      
      if (this.matchingPasswords) {
        try {
          await userStore.createUserProfile(
            this.username,
            this.password,
            this.firstName,
            this.lastName,
            this.email,
            this.birthDate
          )
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
    <RouterLink to="/" class="logo-container">
      <img src="@/assets/img/logo.png" alt="logo" />
      <h1>tokenly</h1>
    </RouterLink>
    <div class="login">
      <form @submit.prevent="handleSubmit()">
        <div>
          <input type="text" :placeholder="$t('First Name')" v-model="firstName" />
          <input type="text" :placeholder="$t('Last Name')" v-model="lastName" />
        </div>
        <input
          class="largeInput"
          type="text"
          :placeholder="$t('Username min6chars')"
          v-model="username"
        />
        <input class="largeInput" type="text" placeholder="Email" v-model="email" />
        <div>
          <input type="password" :placeholder="$t('Password')" v-model="password" />
          <input type="password" :placeholder="$t('Confirm Password')" v-model="confirmPassword" />
        </div>
        <div>
          <input type="date" v-model="birthDate" />
        </div>
        <button type="submit">{{ $t('Sign up') }}</button>
        <p class="error" v-if="error">{{ error }}</p>
      </form>
      <p>
        {{ $t('Already registered?') }}
        <RouterLink to="/login"> {{ $t('Login') }} </RouterLink>
      </p>
    </div>
  </div>
</template>
