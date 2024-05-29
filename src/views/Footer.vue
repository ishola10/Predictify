<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <router-link to="/" class="footer-link">Home</router-link>
        <router-link to="/about" class="footer-link">About Us</router-link>
        <router-link to="/contact" class="footer-link">Contact Us</router-link>
        <router-link to="/faq" class="footer-link"
          >Privacy Policy</router-link
        >
      </div>

      <div class="footer-text">
        <p>&copy; {{ currentYear }} Predictify. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const currentYear = ref(new Date().getFullYear());
</script>

<style>
.footer {
  background-color: #DDA15E;
  color: white;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #BC6C25;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer-links {
  margin-bottom: 10px;
}

.footer-link {
  color: #BC6C25;
  text-decoration: none;
  margin: 0 10px;
}

.footer-link:hover {
  text-decoration: underline;
  color: #606C38;
}

.footer-text {
  color: #FEFAE0;
}
</style>
