<template>
  <div v-if="showNavbar" class="container">
    <div class="logo">
      <router-link to="/">
        <h1>Predictify</h1>
      </router-link>
    </div>
    <nav class="nav">
      <router-link to="/home" class="nav-link" active-class="active"
        >Predict</router-link
      >
      <router-link to="/about" class="nav-link" active-class="active"
        >About</router-link
      >
      <router-link to="/faq" class="nav-link" active-class="active"
        >Faq</router-link
      >
      <router-link to="/contact" class="nav-link" active-class="active"
        >Contact</router-link
      >
    </nav>

    <div v-if="user">
      <div v-if="user" class="butns">
        <router-link to="/profile" class="header-links2">
          <div class="profile-pic-container">
            <img
              :src="user.photoURL || '../assets/default-profile-picture.png'"
              :alt="abbreviateName(user.displayName)"
              class="profile-picture"
              style="width: 60px; height: 60px; margin-bottom: -2%"
            />
          </div>
          <!-- <span class="user-name">{{ user.displayName }}</span> -->
        </router-link>
        <button class="aa" @click="signout">Logout</button>
      </div>
      <router-link v-else to="/profile" class="header-links2">
        <button class="aa">Profile</button>
      </router-link>
    </div>
    <div v-else="loading">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { auth } from "@/firebase";
import router from "@/router/index";

const route = useRoute();
const loading = ref(true);
const user = ref(null);
const showNavbar = ref(false);

onMounted(() => {
  const unsubscribe = auth.onAuthStateChanged((newUser) => {
    user.value = newUser;
    updateNavbarVisibility();
    loading.value = false;
  });

  return unsubscribe;
});

const updateNavbarVisibility = () => {
  showNavbar.value =
    !!user.value &&
    route.name !== "signup" &&
    route.name !== "login" &&  
    route.name !== "not-found" &&
    route;
};

router.afterEach(() => {
  updateNavbarVisibility();
});

const signout = async () => {
  try {
    await auth.signOut();
    console.log("User signed out");
    router.push("/login");
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};

const abbreviateName = (name) => {
  return name.substring(0, 2).toUpperCase();
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  color: white;
  max-width: 1000px;
  margin: 0 auto;
  border-bottom: 2px solid #333;
}

.logo h1 {
  font-size: 1.5rem;
  text-decoration: none;
  margin: 0;
  color: #bc6c25;
}

.profile img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: #dda15e;
}

.nav {
  display: flex;
  gap: 30px; 
  justify-content: flex-start;
}

.nav-link {
  padding: 10px;
  color: var(--color-text);
  text-decoration: none;
}

.nav-link.active {
  border-bottom: 2px solid var(--color-text); /* Active link style */
  font-weight: bold;
  color: var(--color-accent);
}

.nav-link {
  text-decoration: none;
  color: var(--color-text);
  transition: 0.4s;
  padding: 3px;
}

.nav-link:hover {
  border-bottom: 1px solid var(--color-primary);
}

.butns {
  display: flex;
  gap: 20px;
  align-items: center;
}

.aa {
  background-color: #606c38;
  color: var(--color-background);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 30px;
}

.aa:hover {
  background-color: #bc6c25;
}

.profile-pic-container {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}
</style>


