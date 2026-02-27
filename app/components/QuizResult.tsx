"use client";

interface Personality {
  name: string;
  coffee: string;
  tagline: string;
}

interface QuizResultProps {
  personality: Personality;
  onRetake: () => void;
}

export default function QuizResult({ personality, onRetake }: QuizResultProps) {
  return (
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
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>☕</div>

      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
        You are...
      </p>

      <h2
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "2rem",
          color: "var(--text-primary)",
          marginBottom: "0.5rem",
        }}
      >
        {personality.name}
      </h2>

      <div
        style={{
          display: "inline-block",
          background: "var(--accent)",
          color: "#fff",
          borderRadius: "9999px",
          padding: "0.4rem 1.25rem",
          fontSize: "1rem",
          fontWeight: "700",
          marginBottom: "1.25rem",
          fontFamily: "var(--font-lato), sans-serif",
        }}
      >
        {personality.coffee}
      </div>

      <p
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "1.125rem",
          color: "var(--text-secondary)",
          fontStyle: "italic",
          marginBottom: "2rem",
          lineHeight: "1.6",
        }}
      >
        "{personality.tagline}"
      </p>

      <button
        onClick={onRetake}
        style={{
          background: "transparent",
          border: "2px solid var(--accent)",
          color: "var(--accent)",
          borderRadius: "9999px",
          padding: "0.75rem 2rem",
          fontSize: "1rem",
          fontWeight: "700",
          cursor: "pointer",
          transition: "all 0.18s ease",
          fontFamily: "var(--font-lato), sans-serif",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.background = "var(--accent)";
          el.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.background = "transparent";
          el.style.color = "var(--accent)";
        }}
      >
        Retake Quiz
      </button>
    </div>
  );
}
