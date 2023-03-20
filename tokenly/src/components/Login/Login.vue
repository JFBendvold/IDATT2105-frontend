<script setup>
import { RouterLink } from 'vue-router';
import '../../assets/css/login/login.css'
</script>

<template>
    <div class="loginContainer">
        <h1>
            tokenly
        </h1>
        <div class="login">
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? 
                <RouterLink to="/register">
                    Sign up
                </RouterLink>
            </p>
        </div>
    </div>
</template>