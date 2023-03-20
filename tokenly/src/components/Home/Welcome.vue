<script setup>
import { RouterLink } from "vue-router";
import "../../assets/css/home/welcome.css";
import "@fortawesome/fontawesome-free/css/all.css";
</script>

<template>
    <div class="welcome">
        <div class="title">
            <h1>
                Buying and selling NFTs has never been easier.
            </h1>
            <p>
                Create an account to start trading your favorite NFTs today!
            </p>
            <RouterLink to="/login">
                <button class="register">
                    Join Now
                </button>
            </RouterLink>
        </div>
        <div class="background-fade">

        </div>
    </div>
</template>
