<script setup>
import { RouterLink } from 'vue-router'
import '../assets/css/header.css'
import '@fortawesome/fontawesome-free/css/all.css'

// Make the background fade in on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header')
  let opacity = window.scrollY / 100
  if (opacity > 0.4) opacity = 0.4
  header.style.background = `rgba(0, 0, 0, ${opacity})`
});

</script>

<template>
  <header>
    <div class="wrapper">
      <RouterLink to="/" class="logo">
        <h1>tokenly</h1>
      </RouterLink>
        <div class="search">
            <input type="text" placeholder="Search" />
            <button>
                <i class="fas fa-search fa-sm"></i>
            </button>
        </div>
      <nav class="links">
        <ul>
          <li>
            <RouterLink to="/discover">Discover</RouterLink>
          </li>
          <li>
            <RouterLink to="/sell">Sell</RouterLink>
          </li>
          <li>
            <RouterLink to="/favorites">Favorites</RouterLink>
          </li>
          <li>
            <RouterLink to="/login">Login</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
