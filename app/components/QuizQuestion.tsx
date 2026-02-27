"use client";

interface Option {
  emoji: string;
  label: string;
  personality: string;
}

interface QuizQuestionProps {
  question: string;
  options: Option[];
  onAnswer: (personality: string) => void;
  questionNumber: number;
  total: number;
}

export default function QuizQuestion({
  question,
  options,
  onAnswer,
  questionNumber,
  total,
}: QuizQuestionProps) {
  return (
    <div
      style={{
        background: "var(--card-bg)",
        boxShadow: "0 8px 40px var(--shadow)",
        border: "1px solid var(--border)",
        borderRadius: "1.5rem",
        padding: "2.5rem",
        maxWidth: "560px",
        width: "100%",
      }}
    >
      {/* Progress dots */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.75rem", justifyContent: "center" }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i < questionNumber ? "2rem" : "0.6rem",
              height: "0.6rem",
              borderRadius: "9999px",
              background: i < questionNumber ? "var(--accent)" : "var(--border)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <span style={{ fontSize: "2.5rem" }}>☕</span>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
          Question {questionNumber} of {total}
        </p>
      </div>

      {/* Question */}
      <h2
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "1.375rem",
          color: "var(--text-primary)",
          textAlign: "center",
          marginBottom: "1.75rem",
          lineHeight: "1.5",
        }}
      >
        {question}
      </h2>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {options.map((opt) => (
          <button
            key={opt.personality}
            onClick={() => onAnswer(opt.personality)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
              padding: "0.875rem 1.25rem",
              borderRadius: "0.875rem",
              border: "1.5px solid var(--border)",
              background: "transparent",
              color: "var(--text-primary)",
              fontSize: "1rem",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.18s ease",
              fontFamily: "var(--font-lato), sans-serif",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "var(--accent)";
              el.style.borderColor = "var(--accent)";
              el.style.color = "#fff";
              el.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "transparent";
              el.style.borderColor = "var(--border)";
              el.style.color = "var(--text-primary)";
              el.style.transform = "translateX(0)";
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>{opt.emoji}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
