<template>
  <div class="sign">
    <router-link to="/" class="link">← Back Home</router-link>

    <div class="temp">
      <div class="sign-up">
        <h2>
          Welcome to <strong style="color: #bc6c25">Predictify!!</strong>, let's
          get started
        </h2>
        <h3>Sign Up</h3>
        <form @submit.prevent="signup">
          <label for="name">Name:</label>
          <input v-model="name" type="text" required />
          <label for="email">Email:</label>
          <input v-model="email" type="email" required />
          <label for="password">Password:</label>
          <div class="password-container">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
            />
            <input
              @click="togglePasswordVisibility"
              type="checkbox"
              name=""
              id=""
            />
          </div>
          <button
            type="submit"
            :disabled="loading"
            style="background-color: #bc6c25"
          >
            {{ loading ? "Signing up..." : "Signup" }}
          </button>
        </form>
        <br />
        <div>
          <router-link class="login-link" to="/login">
            Already have an account? Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import router from "@/router/index";

const name = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);
const showPassword = ref(false);

const signup = async () => {
  loading.value = true;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    await updateProfile(auth.currentUser, { displayName: name.value });

    const usersCollection = collection(db, "users");
    await addDoc(usersCollection, {
      email: email.value,
      displayName: name.value,
    });

    console.log("User signed up:", userCredential.user);
    router.push("/home");
  } catch (error) {
    console.error("Error signing up:", error.message);
  } finally {
    loading.value = false;
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style>
.sign {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fefae0;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.link {
  display: block;
  color: #bc6c25;
  text-decoration: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
}

.sign-up {
  width: 100%;
  height: 75%;
  max-width: 350px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fefae0;
  color: #283618;
  border: 1px solid #dda15e;
}

.sign-up h3 {
  margin-bottom: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: #bc6c25;
}

.sign-up label {
  text-align: left;
  display: block;
  color: #283618;
}

.sign-up input {
  width: 90%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #bc6c25;
  outline: none;
  background-color: #fefae0;
}

.sign-up button {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #bc6c25;
  color: #fefae0;
}

.sign-up button:hover {
  background-color: #283618;
}

.sign-up button:disabled {
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
  /* flex-grow: 1; */
  border: 1px solid #bc6c25;
  padding: 10px;
  /* outline: none; */
  background-color: #fefae0;
  margin-top: 2.7%;
  width: 690%;
}

.password-container input[type="checkbox"] {
  margin: 3px 0;
}
</style>
