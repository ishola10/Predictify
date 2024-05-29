<template>
  <div class="history-container">
    <h2>Prediction History</h2>
    <div v-if="predictions.length > 0" class="history-table">
      <table>
        <thead>
          <tr>
            <th>Match</th>
            <th>Prediction</th>
            <th>Actual Result</th>
            <th>Accuracy</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prediction in predictions" :key="prediction.matchId">
            <td>{{ prediction.homeTeam }} vs {{ prediction.awayTeam }}</td>
            <td>
              {{ prediction.predictedHomeScore }} -
              {{ prediction.predictedAwayScore }}
            </td>
            <td v-if="prediction.actualResult">{{ prediction.actualResult }}</td>
            <td v-if="prediction.accuracy">{{ prediction.accuracy }}%</td>
            <td>{{ prediction.matchDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="empty-state">
      <p>You haven't made any predictions yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getPredictionsFromLocalStorage } from "@/utils/localStorageUtils";

interface Prediction {
  matchId: number;
  homeTeam: string;
  awayTeam: string;
  predictedHomeScore: number;
  predictedAwayScore: number;
  actualResult?: string;
  accuracy?: number;
  matchDate: string;
}

const predictions = ref<Prediction[]>([]);

onMounted(() => {
  predictions.value = getPredictionsFromLocalStorage();
});
</script>

<style scoped>
.history-container {
  background-color: var(--color-background); 
  padding: 20px;
  border-radius: 8px;
  color: var(--color-text); 
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: var(--color-accent); 
}

.history-table table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--color-primary); 
  border-radius: 8px;
}

thead {
  background-color: var(--color-accent); 
}

thead th {
  padding: 10px;
  color: white;
  border-bottom: 2px solid white;
}

tbody tr {
  border-bottom: 1px solid var(--color-text); 
}

tbody tr:nth-child(even) {
  background-color: var(--color-secondary);
}

tbody td {
  padding: 10px;
  color: var(--color-text); 
}

.empty-state {
  color: gray; 
  font-size: 1rem;
}
</style>
