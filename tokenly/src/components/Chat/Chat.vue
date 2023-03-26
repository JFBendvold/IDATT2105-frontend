<script setup>
import "@/assets/css/chat/chat.css"
import Message from './Message.vue';
import { ref } from 'vue'
import { useUserStore } from '@/stores/UserStore.js'

const userStore = useUserStore()

const chatBtn = ref(null)
const chatContainer = ref(null)
const chatOpen = ref(false)
const chatToOpen = ref("")
const chatToSend = ref("")

function formatPreviewMessage(message) {
    let rawMessage = message
    let messageJson = null

    if (message.startsWith("{")) {
        // Replace all ' with "
        message = message.replace(/'/g, '"')

        // Convert message to JSON
        messageJson = JSON.parse(message)
        console.log(messageJson)

        if (messageJson.type === "bid") {
            return "Bid placed on a NFT"
        } else if (messageJson.type === "acceptance") {
            return "Bid accepted"
        } else if (messageJson.type === "decline") {
            return "Bid declined"
        } else if (messageJson.type === "purchase") {
            return "NFT purchased"
        }
    }

    if (message.length > 20) {
        return message.substring(0, 20) + "..."
    } else {
        return message
    }
}

function openChat() {
    // Set all messages to seen
    chatData.value.find(chat => chat.username === chatToOpen.value).messages[Object.keys(chatData.value.find(chat => chat.username === chatToOpen.value).messages)[Object.keys(chatData.value.find(chat => chat.username === chatToOpen.value).messages).length - 1]].seen = true

    console.log("Opened chat with " + chatToOpen.value)
}

function sendChat() {
    // Check if message is empty
    if (chatToSend.value.trim() === "") {
        return
    }

    // Send chat to database
    console.log("Sent chat to " + chatToOpen.value + ": " + chatToSend.value)

    // Add chat to chatData
    chatData.value.find(chat => chat.username === chatToOpen.value).messages[Object.keys(chatData.value.find(chat => chat.username === chatToOpen.value).messages).length + 1] = {
        message: chatToSend.value,
        time: "12:09",
        isMe: true,
        seen: true
    }

    // Clear chatToSend
    chatToSend.value = ""
}

const chatData = ref([
    {
        username: "JohnDoe",
        messages: {
            1: {
                message: "Hello",
                time: "12:00",
                isMe: false,
                seen: true
            },
            2: {
                message: "Hi",
                time: "12:01",
                isMe: true,
                seen: true
            },
            3: {
                message: "How are you?",
                time: "12:02",
                isMe: false,
                seen: true
            },
            4: {
                message: "I'm fine, thanks for asking, how are you?",
                time: "12:03",
                isMe: true,
                seen: true
            },
            5: {
                message: "What about you?",
                time: "12:04",
                isMe: false,
                seen: true
            },
            6: {
                message: "I'm fine too",
                time: "12:05",
                isMe: true,
                seen: true
            },
            7: {
                message: "Nice to hear that",
                time: "12:06",
                isMe: false,
                seen: true
            },
            8: {
                message: "Bye",
                time: "12:07",
                isMe: false,
                seen: true
            },
            9: {
                message: "Bye",
                time: "12:08",
                isMe: true,
                seen: true
            },
        },
    },
    {
        username: "SuckySurya",
        messages: {
            1: {
                message: "Are you home yet?",
                time: "12:00",
                isMe: false,
                seen: false
            },
            2: {
                message: "{'type':'bid','amount':0.02,'bidId':'1234','itemId':'123'}",
                time: "12:01",
                isMe: false,
                seen: false
            },
            3: {
                message: "{'type':'acceptance','amount':0.02,'bidId':'1234','itemId':'123'}",
                time: "12:02",
                isMe: true,
                seen: true
            },
            4: {
                message: "{'type':'decline','amount':0.02,'bidId':'1234','itemId':'123'}",
                time: "12:03",
                isMe: true,
                seen: true
            },
            5: {
                message: "{'type':'purchase','amount':0.02, 'itemId':'123'}",
                time: "12:04",
                isMe: true,
                seen: true
            },
        },
    }
])

function toggleChat() {
    chatBtn.value.classList.toggle("active")
    chatContainer.value.classList.toggle("active")
}


</script>

<template>
    <div class="chat-btn" ref="chatBtn" v-if="userStore.isLoggedIn">
        <button class="btn btn-primary" @click="toggleChat">
            <i class="fas fa-comment-dots"></i>
            <i class="fas fa-circle notification" v-if="chatData.find(chat => chat.messages[Object.keys(chat.messages)[Object.keys(chat.messages).length - 1]].seen === false)"></i>
        </button>
    </div>
    <div class="chat-container" ref="chatContainer" v-if="userStore.isLoggedIn">
        <div class="chat-header">
            <button class="btn btn-primary" @click="toggleChat">
                <i class="fas fa-times"></i>
            </button>
            <h3 class="chat-title" v-if="!chatOpen">
                Chat
            </h3>
            <h3 class="chat-title" v-if="chatOpen">
                {{ chatToOpen }}
            </h3>
        </div>
        <div class="chat-body">
            <div class="chat-list" v-if="!chatOpen">
                <div class="chat-item clickable" v-for="chat in chatData" :key="chat.username" @click="chatOpen = true; chatToOpen = chat.username; openChat()">
                    <div class="chat-item-header">
                        <h4 class="chat-item-title">{{ chat.username }}</h4>
                        <i class="fas fa-circle notification" v-if="chat.messages[Object.keys(chat.messages)[Object.keys(chat.messages).length - 1]].seen === false"></i>
                    </div>
                    <div class="chat-item-body">
                        <p class="chat-item-message">
                            {{ formatPreviewMessage(chat.messages[Object.keys(chat.messages)[Object.keys(chat.messages).length - 1]].message) }}
                        </p>
                        <p class="chat-item-time">{{ chat.messages[Object.keys(chat.messages)[Object.keys(chat.messages).length - 1]].time }}</p>
                    </div>
                </div>
            </div>
            <div class="chat-content" v-if="chatOpen">
                <div class="chat-content-header">
                    <h4 class="chat-content-title">{{ chatToOpen }}</h4>
                    <button class="btn btn-primary" @click="chatOpen = false">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="chat-content-body">
                    <Message v-for="message in chatData.find(chat => chat.username === chatToOpen).messages" :key="message.time" :message="message" />
                </div>
                <div class="chat-content-footer">
                    <input type="text" class="form-control" placeholder="Type a message..." v-model="chatToSend" @keyup.enter="sendChat">
                    <button class="btn btn-primary" @click="sendChat">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>