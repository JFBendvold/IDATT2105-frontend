<script setup>
import '@/assets/css/profile/profile.css'
import { ref } from 'vue'
import { useUserStore } from '@/stores/UserStore.js'

const userStore = useUserStore()

const errorMsgPassword = ref('')
const errorMsgName = ref('')

function changePassword() {
  const oldPassword = document.getElementById('old-password').value
  const newPassword = document.getElementById('new-password').value
  const confirmPassword = document.getElementById('confirm-password').value

  if (newPassword !== confirmPassword) {
    errorMsgPassword.value = 'Passwords do not match'
    return
  }

  if (newPassword.length < 8) {
    errorMsgPassword.value = 'Password must be at least 8 characters'
    return
  }

  console.log('Change password')
}

function changeName() {
  const newFirstName = document.getElementById('new-first-name').value
  const newLastName = document.getElementById('new-last-name').value

  if (newFirstName.length < 1 || newLastName.length < 1) {
    errorMsgName.value = 'First and last name must be at least 1 character'
    return
  }

  console.log('Change name')
}

function signOut() {
  console.log('Sign out')
  userStore.logUserOut()
  window.location.href = '/'
}
</script>

<template>
  <div class="profile-settings-wrapper">
    <hr />
    <div class="profile-settings-row">
      <div class="profile-settings-column">
        <button class="profile-settings-button" @click="signOut">
          {{ $t('Sign Out') }}
        </button>
      </div>
    </div>
    <hr />
    <h3>
      {{ $t('Change password') }}
    </h3>
    <div class="profile-settings-row">
      <div class="profile-settings-column">
        <label for="old-password">
          {{ $t('Old Password') }}
        </label>
        <input type="password" id="old-password" :placeholder="$t('Old Password')" />
      </div>
    </div>
    <div class="profile-settings-row">
      <div class="profile-settings-column">
        <label for="new-password">
          {{ $t('New Password') }}
        </label>
        <input type="password" id="new-password" :placeholder="$t('New Password')" />
      </div>
      <div class="profile-settings-column">
        <label for="confirm-password">
          {{ $t('Confirm Password') }}
        </label>
        <input type="password" id="confirm-password" :placeholder="$t('Confirm Password')" />
      </div>
    </div>
    <div class="profile-settings-row">
      <div class="profile-settings-column">
        <p class="profile-settings-error">
          {{ errorMsgPassword }}
        </p>
        <button class="profile-settings-button" @click="changePassword">
          {{ $t('Change Password') }}
        </button>
      </div>
    </div>
    <hr />
    <h3>
      {{ $t('Change name') }}
    </h3>
    <div class="profile-settings-row">
      <div class="profile-settings-column">
        <label for="new-first-name">
          {{ $t('First Name') }}
        </label>
        <input type="text" id="new-first-name" :placeholder="$t('First Name')" />
      </div>
      <div class="profile-settings-column">
        <label for="new-last-name">
          {{ $t('Last Name') }}
        </label>
        <input type="text" id="new-last-name" :placeholder="$t('Last Name')" />
      </div>
    </div>
    <div class="profile-settings-row">
      <div class="profile-settings-column">
        <p class="profile-settings-error">
          {{ errorMsgName }}
        </p>
        <button class="profile-settings-button" @click="changeName">
          {{ $t('Change Name') }}
        </button>
      </div>
    </div>
  </div>
</template>
