<script setup>
import { computed, ref } from 'vue'
import "@/assets/css/chat/message.css"

let messageJson = ref(null)

const props = defineProps({
  message: Object,
})

const isMe = computed(() => props.message.isMe)

// Analyze message and give the correct visualisation
console.log(props.message.message)

if (props.message.message.startsWith("{")) {
    // Replace all ' with "
    props.message.message = props.message.message.replace(/'/g, '"')

    // Convert message to JSON
    messageJson.value = JSON.parse(props.message.message)
    console.log(messageJson.value)
}





</script>

<template>
    <div class="chat-content-message-item" :class="{ 'chat-content-message-item-me': message.isMe }">
      <p class="chat-content-message-text" v-if="messageJson === null">
        {{ message.message }}
    </p>
      <p class="chat-content-message-time">{{ message.time }}</p>
    </div>
</template>