<script setup>
import { RouterLink } from 'vue-router';
import '../../assets/css/login/login.css'

let error = ''

</script>

<template>
    <div class="loginContainer">
        <RouterLink to="/">
            <h1>
                tokenly
            </h1>
        </RouterLink>
        <div class="login">
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
                <p class="error" v-if="error">{{ error }}</p>
            </form>
            <p>
                Don't have an account? 
                <RouterLink to="/signup">
                    Sign up
                </RouterLink>
            </p>
        </div>
    </div>
</template>