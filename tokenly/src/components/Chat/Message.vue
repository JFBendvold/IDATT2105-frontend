<script setup>
import { computed, ref } from 'vue'
import "@/assets/css/chat/message.css"

const props = defineProps({
  message: Object,
})

const isMe = computed(() => props.message.isMe)
</script>

<template>
    <div class="chat-content-message-item" :class="{ 'chat-content-message-item-me': message.isMe }">
      <p class="chat-content-message-text">{{ message.message }}</p>
      <p class="chat-content-message-time">{{ message.time }}</p>
    </div>
</template>