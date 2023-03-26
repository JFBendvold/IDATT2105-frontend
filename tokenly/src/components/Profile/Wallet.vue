<script setup>
import '@/assets/css/profile/wallet.css'
import { ref } from 'vue'

const displayDepositPopup = ref(false)
const displayWithdrawPopup = ref(false)
const depositErrorMsg = ref('')
const withdrawErrorMsg = ref('')
const loading = ref(false)

const depositAmount = ref(0.0)
const withdrawAmount = ref(0.0)
const balance = ref(0.0)

// Deposit to wallet
const deposit = () => {
  if (!checkDepositAmount()) {
    return
  }

  //Do call to backend to deposit

  //Set loading to true to show loading animation for 5 seconds
  loading.value = true
  displayDepositPopup.value = false
  setTimeout(() => {
    loading.value = false
  }, 5000)

  console.log('Deposit: ' + depositAmount.value)
}

// Withdraw from wallet
const withdraw = () => {
  if (!checkWithdrawAmount()) {
    return
  }

  //Do call to backend to withdraw

  //Set loading to true to show loading animation for 5 seconds
  loading.value = true
  displayWithdrawPopup.value = false
  setTimeout(() => {
    loading.value = false
  }, 5000)

  console.log('Withdraw: ' + withdrawAmount.value)
}

const checkDepositAmount = () => {
  if (depositAmount.value < 0.01) {
    depositErrorMsg.value = 'Minimum deposit amount is 0.01'
    return false
  } else if (depositAmount.value > 10) {
    depositErrorMsg.value = 'Maximum deposit amount is 10'
    return false
  } else {
    depositErrorMsg.value = ''
    return true
  }
}

const checkWithdrawAmount = () => {
  if (withdrawAmount.value < 0.01) {
    withdrawErrorMsg.value = 'Minimum withdraw amount is 0.01'
    return false
  } else if (withdrawAmount.value > 10) {
    withdrawErrorMsg.value = 'Maximum withdraw amount is 10'
    return false
  } else {
    withdrawErrorMsg.value = ''
    return true
  }
}
</script>

<template>
  <div class="wallet-container">
    <div class="wallet-status">
      <h1 class="wallet-balance">
        {{ $t('Balance') }}
        : {{ balance }}
        <i class="fab fa-ethereum"></i>
      </h1>
    </div>
    <div class="wallet-actions">
      <button class="wallet-action" @click="displayDepositPopup = true">
        <i class="fas fa-arrow-alt-to-left"></i>
        <span class="wallet-action-text">
          {{ $t('Deposit') }}
        </span>
      </button>
      <button class="wallet-action" @click="displayWithdrawPopup = true">
        <i class="fas fa-arrow-alt-from-left"></i>
        <span class="wallet-action-text">
          {{ $t('Withdraw') }}
        </span>
      </button>
    </div>
  </div>
  <div class="deposit-popup wallet-popup" v-if="displayDepositPopup">
    <i class="fas fa-times popup-close" @click="displayDepositPopup = false"></i>
    <h1 class="popup-title">
      {{ $t('Deposit') }}
    </h1>
    <div class="popup-input">
      <label class="popup-input-label">
        {{ $t('Amount to deposit in') }}
        <i class="fab fa-ethereum"></i>
      </label>
      <input type="text" class="popup-input-field" placeholder="Amount" v-model="depositAmount" />
    </div>
    <p class="popup-error">
      {{ depositErrorMsg }}
    </p>
    <button class="popup-button" @click="deposit">
      <i class="fas fa-arrow-alt-to-left"></i>
      <span class="popup-button-text">
        {{ $t('Deposit') }}
      </span>
    </button>
  </div>
  <div class="withdraw-popup wallet-popup" v-if="displayWithdrawPopup">
    <i class="fas fa-times popup-close" @click="displayWithdrawPopup = false"></i>
    <h1 class="popup-title">
      {{ $t('Withdraw') }}
    </h1>
    <div class="popup-input">
      <label class="popup-input-label">
        {{ $t('Amount to withdraw in') }}
        <i class="fab fa-ethereum"></i>
      </label>
      <input type="text" class="popup-input-field" placeholder="Amount" v-model="withdrawAmount" />
    </div>
    <p class="popup-error">
      {{ withdrawErrorMsg }}
    </p>
    <button class="popup-button" @click="withdraw">
      <i class="fas fa-arrow-alt-to-left"></i>
      <span class="popup-button-text">
        {{ $t('Withdraw') }}
      </span>
    </button>
  </div>
  <div class="loading-overlay wallet-popup" v-if="loading">
    <div class="loading-container">
      <div class="loading-background">
        <div class="loading-spinner" />
        <span class="loading-text">
          {{ $t('Loading') }}
          ...
        </span>
      </div>
    </div>
  </div>
</template>
