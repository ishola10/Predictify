<template>
  <div>
    <div class="content">
      <div class="search">
        <p class="text-p">Predict the scores of the matches below:</p>
        <input
          class="search-input"
          type="text"
          placeholder="Search..."
          v-model="searchQuery"
        />
        <div class="prediction-mode">
          <label>
            <input type="radio" v-model="predictionMode" value="single" />
            Predict Single Match
          </label>
          <label>
            <input type="radio" v-model="predictionMode" value="multiple" />
            Predict Multiple Matches
          </label>
        </div>
      </div>

      <div class="matches">
        <div
          class="match-card"
          v-for="match in filteredMatches"
          :key="match.id"
        >
          <div class="team-info">
            <div>
              <h2>{{ match.homeTeam }}</h2>
              <p>vs</p>
              <h2>{{ match.awayTeam }}</h2>
            </div>
            <p class="date">Date: {{ match.date }}</p>
            <div v-if="predictionMode === 'multiple'">
              <input
                type="checkbox"
                v-model="selectedMatches"
                :value="match"
                @change="handleMatchSelection"
              />
            </div>
            <button
              v-if="predictionMode === 'single'"
              @click="togglePrediction(match)"
              :disabled="predicting"
            >
              {{ predicting ? "Predicting..." : "Predict" }}
            </button>
          </div>

          <div
            v-if="match.showPrediction && predictionMode === 'single'"
            class="prediction-inputs"
          >
            <div>
              <label>{{ match.homeTeam }} :</label>
              <input type="number" v-model="match.predictedHomeScore" />
            </div>
            <div>
              <label>{{ match.awayTeam }} :</label>
              <input type="number" v-model="match.predictedAwayScore" />
            </div>
            <button @click="predict(match)" :disabled="predicting">
              {{ predicting ? "Predicting..." : "Predict" }}
            </button>
          </div>

          <div
            v-if="
              predictionMode === 'multiple' && selectedMatches.includes(match)
            "
            class="prediction-inputs"
          >
            <div>
              <label>Home Team Score:</label>
              <input type="number" v-model="match.predictedHomeScore" />
            </div>
            <div>
              <label>Away Team Score:</label>
              <input type="number" v-model="match.predictedAwayScore" />
            </div>
          </div>

          <div class="result-section">
            <div v-if="match.showResult">
              <p>Actual Result: {{ match.result }}</p>
              <p v-if="match.predicted">
                Your Prediction: {{ match.predicted }}
              </p>
              <p v-if="match.accuracy !== null">
                Prediction Accuracy: {{ match.accuracy }}%
              </p>
              <p style="color: aqua" v-if="match.feedback">
                {{ match.feedback }}
              </p>
            </div>
          </div>

          <div v-if="match.showResult" class="save-prediction-button">
            <button @click="savePrediction(match)" :disabled="saving">
              {{ saving ? "Saving..." : "Save Prediction" }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="predictionMode === 'multiple'" class="predict-all">
        <button
          @click="predictAllMatches"
          :disabled="selectedMatches.length === 0"
        >
          Predict All
        </button>
      </div>

      <div v-if="showResultsModal" class="results-modal">
        <div class="modal-content">
          <h3>Prediction Results</h3>
          <div v-for="match in selectedMatches" :key="match.id">
            <p>
              <strong>{{ match.homeTeam }} vs {{ match.awayTeam }}</strong>
            </p>
            <p>
              Predicted Score: {{ match.predictedHomeScore }} -
              {{ match.predictedAwayScore }}
            </p>
            <p>Actual Score: {{ match.result }}</p>
            <p v-if="match.accuracy !== null">
              Prediction Accuracy: {{ match.accuracy }}%
            </p>
            <p style="color: aqua" v-if="match.feedback">
              {{ match.feedback }}
            </p>
            <hr />
          </div>
          <button @click="closeResultsModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { matches, updateResults } from "./matchesData";
import {
  savePredictionToLocalStorage,
  getPredictionStatisticsFromLocalStorage,
} from "../utils/localStorageUtils";

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  showPrediction?: boolean;
  showResult?: boolean;
  result?: string;
  predicted?: string;
  predictedHomeScore: number | null;
  predictedAwayScore: number | null;
  accuracy: number | null;
  feedback?: string;
}

const predicting = ref(false);
const searchQuery = ref("");
const predictionMode = ref<"single" | "multiple">("single");
const selectedMatches = ref<Match[]>([]);
const saving = ref(false);

const showResultsModal = ref(false);
const totalPredictions = ref(0);

const filteredMatches = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return matches.value.filter(
    (match) =>
      match.homeTeam.toLowerCase().includes(query) ||
      match.awayTeam.toLowerCase().includes(query)
  );
});

const handleMatchSelection = (event: Event) => {
  const checkbox = event.target as HTMLInputElement;
  const match: Match = JSON.parse(checkbox.value);

  if (checkbox.checked) {
    selectedMatches.value.push(match);
  } else {
    selectedMatches.value = selectedMatches.value.filter(
      (m) => m.id !== match.id
    );
  }
};

const predictAllMatches = async () => {
  predicting.value = true;

  try {
    for (const match of selectedMatches.value) {
      await predict(match);
    }

    showResultsModal.value = true;
  } catch (error) {
    console.error("Error predicting matches:", error);
  } finally {
    predicting.value = false;
  }
};

const closeResultsModal = () => {
  showResultsModal.value = false;
  selectedMatches.value = [];
};

const togglePrediction = (match: Match) => {
  match.showPrediction = !match.showPrediction;
};

const predict = async (match: Match) => {
  const predictedHomeScore = match.predictedHomeScore;
  const predictedAwayScore = match.predictedAwayScore;

  if (
    predictedHomeScore !== null &&
    predictedAwayScore !== null &&
    !isNaN(predictedHomeScore) &&
    !isNaN(predictedAwayScore)
  ) {
    try {
      predicting.value = true;

      await addDoc(collection(db, "predictions"), {
        fixtureId: match.id,
        homeTeamName: match.homeTeam,
        awayTeamName: match.awayTeam,
        predictedHomeScore,
        predictedAwayScore,
        userId: "user123",
        timestamp: new Date(),
      });

      match.predicted = `${predictedHomeScore} - ${predictedAwayScore}`;
      match.showResult = true;
      updateResults();

      savePredictionToLocalStorage(
        match.id,
        predictedHomeScore,
        predictedAwayScore,
        match.date
      );

      const stats = getPredictionStatisticsFromLocalStorage();
      totalPredictions.value = stats.totalPredictions;
      correctPredictions.value = stats.correctPredictions;
      wrongPredictions.value = stats.wrongPredictions;
      predictionsPerDay.value = stats.predictionsPerDay;
    } catch (error) {
      console.error("Error saving prediction:", error);
    } finally {
      predicting.value = false;
    }
  } else {
    alert("Please enter valid scores for both teams.");
  }
};

const savePrediction = async (match: Match) => {
  saving.value = true;

  savePredictionToLocalStorage(
    match.id,
    match.predictedHomeScore,
    match.predictedAwayScore,
    match.date
  );

  match.showResult = false;

  const stats = getPredictionStatisticsFromLocalStorage();
  totalPredictions.value = stats.totalPredictions;
  correctPredictions.value = stats.correctPredictions;
  wrongPredictions.value = stats.wrongPredictions;
  predictionsPerDay.value = stats.predictionsPerDay;

  setTimeout(() => {
    saving.value = false;
  }, 20000);
};
</script>

<style scoped>
.text {
  font-size: 2rem;
  color: var(--color-text); 
}
.text-p {
  font-size: 1.5rem;
  color: var(--color-text); 
}
.content {
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2%;
  margin: 0 auto;
  padding: 20px;
}
.search {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 3%;
}
.search-input {
  width: 40%;
  padding: 10px;
  background-color: var(--color-background);
  border-radius: 5px;
  border: 1px solid gray;
  color: gray;
}
.prediction-mode {
  margin-top: 10px;
}
.prediction-mode label {
  margin-right: 20px;
  color: var(--color-text); 
  cursor: pointer;
}
.prediction-mode input {
  margin-right: 5px;
}

.matches {
  padding: 10px 20px;
  border: 1px solid gray;
  width: 88%;
}
.match-card {
  display: flex;
  flex-direction: column;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 8px;
  background-color: var(--color-secondary); 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.team-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.match-card h2 {
  font-size: 1.2rem;
  margin: 0;
  color: var(--color-text); 
}

.match-card p {
  margin: 0;
  color: #6a6969;
}


.match-card input[type="checkbox"] {
  margin-top: 10px;
  transform: scale(1.2);
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  background-color: var(--color-primary); 
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: darkred;
}
button[disabled] {
  background-color: gray;
  cursor: not-allowed;
}

.match-card .date {
  color: gray;
  font-size: 0.9rem;
}

.match-card .result-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 20px;
}

.match-card .result-section p {
  margin: 2px 0;
}

.match-card .prediction-inputs {
  display: flex;
  gap: 20px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  border-top: 1px solid #666;
  border-bottom: 1px solid #666;
}

.match-card .prediction-inputs label,
.match-card .prediction-inputs input {
  margin-bottom: 5px;
  color: #666;
}

.match-card .prediction-inputs input {
  width: 60px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.match-card .prediction-inputs button {
  padding: 8px 16px;
  background: none;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1%;
}

.match-card .prediction-inputs button:hover {
  background-color: orangered;
}

.save-prediction-button {
  margin-top: 10px;
}

.save-prediction-button button {
  padding: 10px 20px;
  background-color: var(--color-accent); 
  color: black;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.save-prediction-button button:hover {
  background-color: blue;
  color: white;
}

.results-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 50vw;
  max-height: 70vh;
  overflow-y: auto;
}

.modal-content h3 {
  margin-bottom: 10px;
  color: var(--color-primary); 
}

.modal-content p {
  margin: 5px 0;
  color: black;
}

.modal-content hr {
  margin: 10px 0;
}

.modal-content button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: var(--color-primary); 
  color: white;
  cursor: pointer;
  margin-top: 20px;
}

.modal-content button:hover {
  background-color: darkred;
}
</style>
