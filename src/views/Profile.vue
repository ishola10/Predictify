<template>
  <div class="profile">
    <h2>Profile</h2>
    
    <div v-if="user">
      <div class="container">
        <div class="sidebar">
          <button
            class="nav-button"
            :class="{ active: activeSection === 'details' }"
            @click="setActiveSection('details')"
          >
            User Details
          </button>
          <button
            class="nav-button"
            :class="{ active: activeSection === 'stats' }"
            @click="setActiveSection('stats')"
          >
            Stats
          </button>
          <button
            class="nav-button"
            :class="{ active: activeSection === 'history' }"
            @click="setActiveSection('history')"
          >
            History
          </button>

          <button class="signout-btn" @click="signout">Sign out</button>
        </div>

        <div class="main-content">
          <div v-if="activeSection === 'details'">
            <div class="user-info">
              <div class="profile-picture">
                <img
                  :src="user.photoURL || '../assets/default-profile-picture.png'"
                  :alt="user.displayName"
                />
                <input
                  class="file-input"
                  type="file"
                  accept="image/*"
                  @change="uploadProfilePicture"
                />
              </div>
              <div class="user-details">
                <div v-if="editing">
                  <label for="newName">New Name:</label>
                  <input v-model="newName" type="text" required />
                  <label for="dob">Date of Birth:</label>
                  <input v-model="dob" type="date" required />
                  <label for="address">Address:</label>
                  <input v-model="address" type="text" required />
                  <label for="phone">Phone Number:</label>
                  <input v-model="phone" type="tel" required />
                  <button @click="saveProfile">Save</button>
                  <button @click="cancelEdit">Cancel</button>
                </div>
                <div v-else>
                  <p><strong>Name:</strong> {{ user.displayName }}</p>
                  <p><strong>Date of Birth:</strong> {{ dob }}</p>
                  <p><strong>Address:</strong> {{ address }}</p>
                  <p><strong>Phone Number:</strong> {{ phone }}</p>
                  <button class="edit-button" @click="startEdit">Edit Profile</button>
                </div>
               
              </div>
            </div>
          </div>

          <div v-if="activeSection === 'stats'">
            <!-- Prediction Stats Section -->
            <div class="prediction-stats">
              <h3>Prediction Statistics</h3>
              <p>Total Predictions: {{ totalPredictions }}</p>
              <p>Correct Predictions: {{ correctPredictions }}</p>
              <p>Wrong Predictions: {{ wrongPredictions }}</p>
            </div>
          </div>

          <div v-if="activeSection === 'history'">
            <!-- Prediction History Section -->
            <PredictionHistory />
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>User not logged in</p>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import PredictionHistory from '@/components/PredictionHistory.vue'; // Import PredictionHistory if needed

import { ref, onMounted } from 'vue';
import { auth, storage } from '@/firebase'; // Make sure to replace '@/firebase' with your firebase config file path
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage';
import { updateProfile, User } from 'firebase/auth';
import { getPredictionStatisticsFromLocalStorage } from '@/utils/localStorageUtils';
import router from '@/router';

const user = ref<User | null>(null);
const editing = ref<boolean>(false);
const newName = ref<string>('');
const dob = ref<string>('');
const address = ref<string>('');
const phone = ref<string>('');
const totalPredictions = ref<number>(0);
const correctPredictions = ref<number>(0);
const wrongPredictions = ref<number>(0);
const activeSection = ref<string>('details'); // Active section state

onMounted(() => {
  const unsubscribe = auth.onAuthStateChanged((newUser) => {
    user.value = newUser;
    if (newUser) {
      newName.value = newUser.displayName || '';
      dob.value = newUser.dob || '';
      address.value = newUser.address || '';
      phone.value = newUser.phone || '';

      const stats = getPredictionStatisticsFromLocalStorage();
      totalPredictions.value = stats.totalPredictions;
      correctPredictions.value = stats.correctPredictions;
      wrongPredictions.value = stats.wrongPredictions;
    }
  });

  return () => {
    unsubscribe();
  };
});

const uploadProfilePicture = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    try {
      const storagePath = `profile_pictures/${user.value?.uid}`;
      const storageRefPath = storageRef(storage, storagePath);
      await uploadBytes(storageRefPath, file);

      const downloadURL = await getDownloadURL(storageRefPath);
      await updateProfile(user.value, { photoURL: downloadURL });

      user.value!.photoURL = downloadURL;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  }
};

const saveProfile = async () => {
  if (user.value) {
    try {
      await updateProfile(user.value, {
        displayName: newName.value,
        dob: dob.value,
        address: address.value,
        phone: phone.value,
      });
      editing.value = false;
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  }
};

const cancelEdit = () => {
  editing.value = false;
};

const startEdit = () => {
  newName.value = user.value?.displayName || '';
  dob.value = user.value?.dob || '';
  address.value = user.value?.address || '';
  phone.value = user.value?.phone || '';
  editing.value = true;
};

const signout = async () => {
  try {
    await auth.signOut();
    router.push('/');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

const setActiveSection = (section: string) => {
  activeSection.value = section;
};
</script>

<style scoped>
.profile {
  background-color: var(--color-background); 
  color: var(--color-text); 
  margin: 0 auto;
  margin-top: 5%;
  padding: 20px;
  border-radius: 5px;
}

.container {
  display: flex;
  width: 100%;
}

.sidebar {
  width: 20%;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
}

.nav-button {
  padding: 10px;
  background-color: var(--color-primary); 
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  text-align: left;
  border-radius: 5px;
}

.nav-button.active {
  background-color: var(--color-accent); 
}

.main-content {
  width: 70%;
  border: 1px solid var(--color-accent); 
  border-radius: 5px;
  padding: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-picture {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  width: 100%;
}

.user-details input {
  width: calc(100% - 20px);
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid var(--color-text); 
  background-color: var(--color-background); 
  color: var(--color-text); 
}

.user-details button {
  width: 15%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-primary); 
  color: white;
  cursor: pointer;
  margin-top: 10px;
}

.user-details button:hover {
  background-color: var(--color-accent); 
}

.user-details button:disabled {
  background-color: gray;
  cursor: not-allowed;
}

.user-details p {
  margin-bottom: 10px;
}

.prediction-stats {
  margin-top: 20px;
  border-top: 1px solid var(--color-accent); 
  padding-top: 10px;
}

.prediction-stats h3 {
  color: var(--color-accent); 
  margin-bottom: 10px;
}

.prediction-stats p {
  margin: 5px 0;
}

.signout-btn {
  padding: 10px;
  background-color: var(--color-danger);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: auto;
}

.signout-btn:hover{
  background-color: var(--color-danger-dark);
}
</style>

