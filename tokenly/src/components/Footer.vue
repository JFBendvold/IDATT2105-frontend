<script setup>
import '../assets/css/footer.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { RouterLink } from 'vue-router'

const changeLanguage = () => {
  const language = document.getElementById('language').value
  console.log('changed language to: ' + language)
  //localStorage.setItem('language', language)
  //window.location.reload()
}
</script>

<template>
  <div class="footer">
    <div class="containers">
      <div class="footer-container">
        <h2 class="footer-title">Links</h2>
        <div class="footer-links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/discover">Discover</RouterLink>
          <RouterLink to="/publish">Publish</RouterLink>
          <RouterLink to="/profile">Profile</RouterLink>
        </div>
      </div>
      <div class="footer-container">
        <h2 class="footer-title">Social</h2>
        <div class="footer-links">
          <a href="https://twitter.com/0xNFT" target="_blank">
            <i class="fab fa-twitter"></i>
            Twitter
          </a>
          <a href="https://instagram.com/0xNFT" target="_blank">
            <i class="fab fa-instagram"></i>
            Instagram
          </a>
          <a href="https://facebook.com/0xNFT" target="_blank">
            <i class="fab fa-facebook"></i>
            Facebook
          </a>
          <a href="https://reddit.com/r/0xNFT" target="_blank">
            <i class="fab fa-reddit"></i>
            Reddit
          </a>
          <a href="https://discord.gg/0xNFT" target="_blank">
            <i class="fab fa-discord"></i>
            Discord
          </a>
        </div>
      </div>
      <div class="footer-container">
        <h2 class="footer-title">Legal</h2>
        <div class="footer-links">
          <a href="https://0xNFT.com/terms" target="_blank">Terms of Service</a>
          <a href="https://0xNFT.com/privacy" target="_blank">Privacy Policy</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <select class="footer-language" name="language" id="language" @change="changeLanguage">
        <option value="" disabled selected>Select Language</option>
        <option value="en">English</option>
        <option value="no">Norsk</option>
      </select>
      <p>© 2023 tokenly. All rights reserved.</p>
    </div>
  </div>
</template>
