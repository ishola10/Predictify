import { ref } from "vue";

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  predictedHomeScore: number | null;
  predictedAwayScore: number | null;
  predicted: string | null;
  result: string | null;
  accuracy: number | null;
  showPrediction: boolean;
  showResult: boolean;
  feedback: string;
}

export const matches = ref<Match[]>([
  {
    id: 1,
    homeTeam: "Chelsea",
    awayTeam: "Manchester United",
    date: "2024-04-01",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 2,
    homeTeam: "Barcelona",
    awayTeam: "Real-madrid",
    date: "2024-04-02",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 3,
    homeTeam: "Liverpool",
    awayTeam: "Arsenal",
    date: "2024-04-02",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 4,
    homeTeam: "Bayern Munich",
    awayTeam: "PSG",
    date: "2024-04-03",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 5,
    homeTeam: "Juventus",
    awayTeam: "AC Milan",
    date: "2024-04-03",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 6,
    homeTeam: "Atletico Madrid",
    awayTeam: "Sevilla",
    date: "2024-04-04",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 7,
    homeTeam: "Inter Milan",
    awayTeam: "Napoli",
    date: "2024-04-04",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 8,
    homeTeam: "Borussia Dortmund",
    awayTeam: "RB Leipzig",
    date: "2024-04-05",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 9,
    homeTeam: "Manchester City",
    awayTeam: "Tottenham",
    date: "2024-04-05",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 10,
    homeTeam: "Leicester City",
    awayTeam: "West Ham",
    date: "2024-04-06",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 11,
    homeTeam: "Everton",
    awayTeam: "Southampton",
    date: "2024-04-06",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 12,
    homeTeam: "Crystal Palace",
    awayTeam: "Wolves",
    date: "2024-04-07",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 13,
    homeTeam: "Fulham",
    awayTeam: "Brentford",
    date: "2024-04-07",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 14,
    homeTeam: "Brighton",
    awayTeam: "Newcastle",
    date: "2024-04-08",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 15,
    homeTeam: "Burnley",
    awayTeam: "Watford",
    date: "2024-04-08",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 16,
    homeTeam: "Sheffield United",
    awayTeam: "Norwich City",
    date: "2024-04-09",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 17,
    homeTeam: "Bournemouth",
    awayTeam: "Huddersfield",
    date: "2024-04-09",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 18,
    homeTeam: "Middlesbrough",
    awayTeam: "Blackburn Rovers",
    date: "2024-04-10",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 19,
    homeTeam: "Preston North End",
    awayTeam: "Coventry City",
    date: "2024-04-10",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
  {
    id: 20,
    homeTeam: "Queens Park Rangers",
    awayTeam: "Swansea City",
    date: "2024-04-11",
    predictedHomeScore: null,
    predictedAwayScore: null,
    predicted: null,
    result: null,
    accuracy: null,
    showPrediction: false,
    showResult: false,
    feedback: "",
  },
]);

export const updateResults = () => {
  matches.value[0].result = "2 - 1";
  matches.value[1].result = "3 - 0";
  matches.value[2].result = "1 - 1";
  matches.value[3].result = "2 - 2";
  matches.value[4].result = "0 - 1";
  matches.value[5].result = "3 - 0";
  matches.value[6].result = "1 - 0";
  matches.value[7].result = "2 - 2";
  matches.value[8].result = "3 - 1";
  matches.value[9].result = "1 - 1";
  matches.value[10].result = "2 - 0";
  matches.value[11].result = "1 - 1";
  matches.value[12].result = "0 - 1";
  matches.value[13].result = "2 - 2";
  matches.value[14].result = "1 - 0";
  matches.value[15].result = "2 - 1";
  matches.value[16].result = "1 - 1";
  matches.value[17].result = "2 - 0";
  matches.value[18].result = "1 - 1";
  matches.value[19].result = "2 - 1";
  
  matches.value.forEach((match) => {
    if (match.predicted && match.result) {
      const [predictedHomeScore, predictedAwayScore] = match.predicted.split(" - ");
      const [actualHomeScore, actualAwayScore] = match.result.split(" - ");
      const correctHomeScore = parseInt(predictedHomeScore) === parseInt(actualHomeScore);
      const correctAwayScore = parseInt(predictedAwayScore) === parseInt(actualAwayScore);
      match.accuracy = correctHomeScore && correctAwayScore ? 100 : 0;

      if (match.accuracy === 100) {
        match.feedback = "Congratulations! Your prediction was spot on!😍😎";
      } else {
        match.feedback = "Your prediction was not accurate. Better luck next time!😢😒";
      }
    }
  });
};
