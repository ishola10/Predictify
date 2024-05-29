<template>
  <div class="log">
    <router-link to="/" class="link">← Back Home</router-link>
    <div class="temp">
      <div class="login">
        <h2>
          Welcome to <strong style="color: orangered">Predictify!!</strong>,
          let's get started
        </h2>
        <h3>Login</h3>
        <form @submit.prevent="login">
          <label for="email">Email:</label>
          <input v-model="email" type="email" required />
          <label for="password">Password:</label>
          <input v-model="password" type="password" required />
          <button type="submit" :disabled="loading">
            {{ loading ? "Logging in..." : "Login" }}
          </button>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </form>
        <br />
        <div>
          <router-link class="signup-link" to="/signup">
            Don't have an account? Sign up
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import router from "@/router/index";

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");

const login = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log("User logged in successfully");
    router.push("/home");
  } catch (error) {
    console.error("Error logging in:", error.message);
    errorMessage.value = "Invalid email or password";
  } finally {
    loading.value = false;
  }
};
</script>

<style>
.log {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fefae0;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.temp {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fefae0;
}

.login {
  width: 100%;
  max-width: 350px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fefae0;
  color: #283618;
  border: 1px solid #dda15e;
}

.login h3 {
  margin-bottom: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: #bc6c25;
}

.login label {
  text-align: left;
  display: block;
  color: #283618;
}

.login input {
  width: 90%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #bc6c25;
  outline: none;
  background-color: #fefae0;
  color: #283618;
}

.login button {
  width: 96%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #bc6c25;
  color: #fefae0;
}

.login button:hover {
  background-color: #283618;
}

.login button:disabled {
  background-color: gray;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 10px;
  color: #283618;
  text-decoration: underline;
}

.password-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #bc6c25;
  border-radius: 5px;
  margin-bottom: 10px;
  height: 36px;
  width: 95%;
}

.password-container input[type="password"],
.password-container input[type="text"] {
  border: none;
  padding: 10px;
  background-color: #fefae0;
  margin-top: 2.7%;
  width: 75%;
}

.password-container input[type="checkbox"] {
  margin: 3px 0;
}
.signup-link {
  text-align: center;
  margin-top: 10px;
  color: #283618;
  text-decoration: underline;
}
</style>
