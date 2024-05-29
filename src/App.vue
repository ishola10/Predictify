<template>
  <div>
    <NavBar :showNavbar="showNavbar" :user="user" />
    <router-view />
  </div>
</template>

<script setup>
import NavBar from "@/components/Navbar.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "@/firebase";

const router = useRouter();
const showNavbar = ref(false);
const user = ref(null);

auth.onAuthStateChanged((newUser) => {
  user.value = newUser;
  showNavbar.value = !["signup", "login"].includes(router.currentRoute.value.name);
});
</script>
