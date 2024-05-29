import { matches } from "@/components/matchesData";

interface Prediction {
  matchId: number;
  predictedHomeScore: number;
  predictedAwayScore: number;
  matchDate: string;
  timestamp: string;
}

export function savePredictionToLocalStorage(
  matchId: number,
  predictedHomeScore: number,
  predictedAwayScore: number,
  matchDate: string
): void {
  const predictions: Prediction[] = JSON.parse(localStorage.getItem("predictions")) || [];

  const existingPredictionIndex = predictions.findIndex(
    (prediction) => prediction.matchId === matchId
  );

  const newPrediction: Prediction = {
    matchId,
    predictedHomeScore,
    predictedAwayScore,
    matchDate,
    timestamp: new Date().toISOString(),
  };

  if (existingPredictionIndex > -1) {
    predictions[existingPredictionIndex] = newPrediction;
  } else {
    predictions.push(newPrediction);
  }

  localStorage.setItem("predictions", JSON.stringify(predictions));
}

export function getPredictionStatisticsFromLocalStorage() {
  let predictions: Prediction[] = [];
  try {
    const storedData = localStorage.getItem("predictions");
    if (storedData) {
      predictions = JSON.parse(storedData);
    }
  } catch (error) {
    console.error("Error parsing local storage data:", error);
    predictions = [];
  }

  let totalPredictions = 0;
  let correctPredictions = 0;
  let wrongPredictions = 0;
  const predictionsPerDay: { [date: string]: { totalPredictions: number; correctPredictions: number; wrongPredictions: number } } = {};

  if (!Array.isArray(matches.value)) {
    console.error("Invalid matches data: matches is not an array.");
    return {
      totalPredictions,
      correctPredictions,
      wrongPredictions,
      predictionsPerDay,
    };
  }

  predictions.forEach((prediction) => {
    totalPredictions += 1;

    const date = prediction.matchDate.split("T")[0];

    const match = matches.value.find((m) => m.id === prediction.matchId);
    if (match) {
      if (match.result) {
        const resultParts = match.result.split(" - ");
        if (resultParts.length === 2) {
          const actualHomeScore = parseInt(resultParts[0], 10);
          const actualAwayScore = parseInt(resultParts[1], 10);

          const predictedHomeScore = parseInt(prediction.predictedHomeScore, 10);
          const predictedAwayScore = parseInt(prediction.predictedAwayScore, 10);

          if (actualHomeScore === predictedHomeScore && actualAwayScore === predictedAwayScore) {
            correctPredictions += 1;
          } else {
            wrongPredictions += 1;
          }

          if (!predictionsPerDay[date]) {
            predictionsPerDay[date] = {
              totalPredictions: 0,
              correctPredictions: 0,
              wrongPredictions: 0,
            };
          }

          predictionsPerDay[date].totalPredictions += 1;
          if (actualHomeScore === predictedHomeScore && actualAwayScore === predictedAwayScore) {
            predictionsPerDay[date].correctPredictions += 1;
          } else {
            predictionsPerDay[date].wrongPredictions += 1;
          }
        } else {
          console.error("Invalid result format:", match.result);
        }
      } else {
        console.error("Result is missing for match ID:", match.id);
      }
    }
  });

  return {
    totalPredictions,
    correctPredictions,
    wrongPredictions,
    predictionsPerDay,
  };
}

export function getPredictionsFromLocalStorage(): Prediction[] {
  try {
    const storedData = localStorage.getItem("predictions");
    if (storedData) {
      const predictions: Prediction[] = JSON.parse(storedData);
      return predictions.map((prediction) => {
        const match = matches.value.find((m) => m.id === prediction.matchId);

        let accuracy = 0;
        if (match && match.result) {
          const [predictedHomeScore, predictedAwayScore] = [
            parseInt(prediction.predictedHomeScore, 10),
            parseInt(prediction.predictedAwayScore, 10)
          ];
          const [actualHomeScore, actualAwayScore] = match.result.split(" - ").map(Number);

          if (predictedHomeScore === actualHomeScore && predictedAwayScore === actualAwayScore) {
            accuracy = 100; 
          }
        }

        return {
          ...prediction,
          homeTeam: match?.homeTeam || 'Unknown',
          awayTeam: match?.awayTeam || 'Unknown',
          actualResult: match?.result || null,
          accuracy: accuracy,
        };
      });
    }
  } catch (error) {
    console.error("Error parsing local storage data:", error);
  }
  return [];
}
