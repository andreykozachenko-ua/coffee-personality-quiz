"use client";

import { useState } from "react";
import QuizQuestion from "./components/QuizQuestion";
import QuizResult from "./components/QuizResult";

const questions = [
  {
    text: "How do you start your morning?",
    options: [
      { emoji: "🏃", label: "Jump straight into action", personality: "bold" },
      { emoji: "🌸", label: "Ease in with something sweet", personality: "sweet" },
      { emoji: "📱", label: "Check messages and catch up with people", personality: "social" },
      { emoji: "🛁", label: "Treat myself to a slow, luxurious routine", personality: "indulgent" },
    ],
  },
  {
    text: "Pick your ideal weekend activity.",
    options: [
      { emoji: "🧗", label: "Rock climbing or a new adventure sport", personality: "bold" },
      { emoji: "🧁", label: "Baking something delicious at home", personality: "sweet" },
      { emoji: "🎉", label: "Brunch with a big group of friends", personality: "social" },
      { emoji: "🛋️", label: "Movie marathon with all the snacks", personality: "indulgent" },
    ],
  },
  {
    text: "How do you handle a tough challenge?",
    options: [
      { emoji: "💪", label: "Attack it head-on — no hesitation", personality: "bold" },
      { emoji: "🍰", label: "Reward myself with something nice along the way", personality: "sweet" },
      { emoji: "🤝", label: "Rally the team — teamwork makes the dream work", personality: "social" },
      { emoji: "🛁", label: "Take a self-care break to recharge first", personality: "indulgent" },
    ],
  },
  {
    text: "What's your go-to dessert order?",
    options: [
      { emoji: "🌶️", label: "Dark chocolate — intense and bold", personality: "bold" },
      { emoji: "🍮", label: "Crème brûlée — sweet and elegant", personality: "sweet" },
      { emoji: "🎂", label: "A shared dessert platter for the table", personality: "social" },
      { emoji: "🍨", label: "Extra scoop, whipped cream, the works", personality: "indulgent" },
    ],
  },
  {
    text: "Choose your dream travel vibe.",
    options: [
      { emoji: "🏔️", label: "Backpacking through rugged mountains", personality: "bold" },
      { emoji: "🌻", label: "A charming village with flower markets", personality: "sweet" },
      { emoji: "🏙️", label: "A buzzing city with tons of nightlife", personality: "social" },
      { emoji: "🏝️", label: "All-inclusive resort — full pampering mode", personality: "indulgent" },
    ],
  },
];

const personalities: Record<string, { name: string; coffee: string; tagline: string }> = {
  bold: {
    name: "The Bold Adventurer",
    coffee: "Double Espresso",
    tagline: "You live for intensity — no half measures, no apologies.",
  },
  sweet: {
    name: "The Sweet Enthusiast",
    coffee: "Caramel Latte",
    tagline: "Life's too short for bitter. You find beauty in every sweet moment.",
  },
  social: {
    name: "The Social Butterfly",
    coffee: "Cappuccino",
    tagline: "Coffee is better with company. You're the reason people stay longer.",
  },
  indulgent: {
    name: "The Indulgent Treat",
    coffee: "Mocha with Whip",
    tagline: "Coffee is dessert. You believe every day deserves a little decadence.",
  },
};

function getResult(answers: string[]): string {
  const tally: Record<string, number> = { bold: 0, sweet: 0, social: 0, indulgent: 0 };
  answers.forEach((a) => tally[a]++);

  // Tie-break by first appearance order
  let best = answers[0];
  let bestCount = tally[answers[0]];
  for (const key of ["bold", "sweet", "social", "indulgent"]) {
    if (tally[key] > bestCount) {
      best = key;
      bestCount = tally[key];
    }
  }
  return best;
}

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  function handleAnswer(personality: string) {
    const newAnswers = [...answers, personality];
    if (newAnswers.length === questions.length) {
      setAnswers(newAnswers);
      setShowResult(true);
    } else {
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function handleRetake() {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  }

  const resultKey = showResult ? getResult(answers) : null;

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      {!showResult && currentQuestion === 0 && answers.length === 0 && (
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "2.25rem",
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            What&apos;s Your Coffee Personality?
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem" }}>
            Answer 5 quick questions to find your perfect brew.
          </p>
        </div>
      )}

      {!showResult ? (
        <QuizQuestion
          question={questions[currentQuestion].text}
          options={questions[currentQuestion].options}
          onAnswer={handleAnswer}
          questionNumber={currentQuestion + 1}
          total={questions.length}
        />
      ) : (
        resultKey && (
          <QuizResult
            personality={personalities[resultKey]}
            onRetake={handleRetake}
          />
        )
      )}
    </main>
  );
}
