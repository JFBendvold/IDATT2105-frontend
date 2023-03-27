<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import '@/assets/css/chat/message.css'

const isActionMessage = ref(false)
let messageJson = null

const props = defineProps({
  message: Object
})
const isMe = computed(() => props.message.isMe)

function acceptBid() {
  console.log('Accept bid')
}

function declineBid() {
  console.log('Decline bid')
}

// Analyze message and give the correct visualisation
if (props.message.message.startsWith('{')) {
  // Replace all ' with "
  props.message.message = props.message.message.replace(/'/g, '"')

  // Convert message to JSON
  messageJson = JSON.parse(props.message.message)
  console.log(messageJson)

  isActionMessage.value = true

  if (messageJson.type === 'bid') {
    //Check if the item is still available
    //If the item is still available, show the bid
    //If the item is not available, delete the bid
  }
}
</script>

<template>
  <div
    class="chat-content-message-item"
    :class="{ 'chat-content-message-item-me': message.isMe, 'action-message': isActionMessage }"
  >
    <p class="chat-content-message-text" v-if="messageJson === null">
      {{ message.message }}
    </p>
    <div class="chat-content-type" v-else>
      <div class="chat-bid" v-if="messageJson.type === 'bid'">
        <p class="chat-content-title">
          Bid placed on
          <RouterLink :to="'/nft?id=' + messageJson.itemId">
            NFT: {{ messageJson.itemId }}
          </RouterLink>
        </p>
        <p class="chat-content-message-text">
          {{ messageJson.amount }} <i class="fab fa-ethereum"></i>
        </p>
        <div class="chat-bid-actions" v-if="!isMe">
          <button class="chat-bid-action chat-bid-action-accept" @click="acceptBid">
            <i class="fas fa-check"></i>
          </button>
          <button class="chat-bid-action chat-bid-action-decline" @click="declineBid">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div class="chat-acceptance" v-else-if="messageJson.type === 'acceptance'">
        <p class="chat-content-title">
          Bid accepted on
          <RouterLink :to="'/nft?id=' + messageJson.itemId">
            NFT: {{ messageJson.itemId }}
          </RouterLink>
        </p>
        <p class="chat-content-message-text">
          {{ messageJson.amount }} <i class="fab fa-ethereum"></i>
        </p>
      </div>
      <div class="chat-decline" v-else-if="messageJson.type === 'decline'">
        <p class="chat-content-title">
          Bid declined on
          <RouterLink :to="'/nft?id=' + messageJson.itemId">
            NFT: {{ messageJson.itemId }}
          </RouterLink>
        </p>
        <p class="chat-content-message-text">
          {{ messageJson.amount }} <i class="fab fa-ethereum"></i>
        </p>
      </div>
      <div class="chat-purchase" v-else-if="messageJson.type === 'purchase'">
        <p class="chat-content-title">
          NFT purchased for {{ messageJson.amount }} <i class="fab fa-ethereum"></i>
        </p>
        <p class="chat-content-message-text">
          <RouterLink :to="'/nft?id=' + messageJson.itemId">
            NFT: {{ messageJson.itemId }}
          </RouterLink>
        </p>
      </div>
    </div>
    <p class="chat-content-message-time">{{ message.time }}</p>
  </div>
</template>
