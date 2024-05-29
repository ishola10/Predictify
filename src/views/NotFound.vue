<template>
  <div class="error-page">
    <div class="content">
      <h1 class="error-code">404</h1>
      <p class="error-message">
        Oops! The page you are looking for could not be found.
      </p>
      <router-link to="/" class="home-link">Go back to Home</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style>
.error-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
}

.content {
  text-align: center;
  color: white;
}

.error-code {
  font-size: 5rem;
  color: orangered;
  margin-bottom: 20px;
}

.error-message {
  margin-bottom: 20px;
}

.home-link {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: orangered;
  color: white;
  text-decoration: none;
  cursor: pointer;
}

.home-link:hover {
  background-color: darkred;
}
</style>
