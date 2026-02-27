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
  const [started, setStarted] = useState(false);
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
    setStarted(false);
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
      {!started ? (
        <div
          style={{
            background: "var(--card-bg)",
            boxShadow: "0 8px 40px var(--shadow)",
            border: "1px solid var(--border)",
            borderRadius: "1.5rem",
            padding: "3rem 2.5rem",
            maxWidth: "480px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1.25rem" }}>☕</div>
          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "2.75rem",
              color: "var(--text-primary)",
              marginBottom: "1rem",
              lineHeight: "1.3",
            }}
          >
            What&apos;s Your Coffee Personality?
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.0625rem",
              lineHeight: "1.7",
              marginBottom: "0.75rem",
            }}
          >
            Not all coffee drinkers are created equal. Are you a bold shot of espresso or a cozy caramel latte?
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9375rem",
              marginBottom: "2rem",
            }}
          >
            Answer 5 quick questions to discover your perfect brew.
          </p>
          <button
            onClick={() => setStarted(true)}
            style={{
              background: "var(--accent)",
              color: "#fff",
              border: "none",
              borderRadius: "9999px",
              padding: "1.125rem 3.5rem",
              fontSize: "1.25rem",
              fontWeight: "700",
              cursor: "pointer",
              transition: "background 0.18s ease",
              fontFamily: "var(--font-lato), sans-serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent-dark)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent)"; }}
          >
            Start Quiz →
          </button>
        </div>
      ) : !showResult ? (
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
