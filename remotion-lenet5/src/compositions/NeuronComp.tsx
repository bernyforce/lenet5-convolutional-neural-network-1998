import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const NeuronComp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pulse animation
  const pulse = interpolate(frame % (fps * 2), [0, fps, fps * 2], [0, 1, 0]);
  const sumVal = (1.5 + pulse * 1.0).toFixed(2);
  const isActivated = parseFloat(sumVal) >= 2.0;

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
        color: "#ffffff",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      <div style={{ fontSize: 32, fontWeight: "bold", color: "#38bdf8", marginBottom: 10 }}>
        2. Le Neurone Artificiel : Somme Pondérée &amp; Activation
      </div>
      <div style={{ fontSize: 18, color: "#94a3b8", marginBottom: 50 }}>
        Entrées (x) × Poids (w) ➔ Somme (∑) ➔ Comparaison au Seuil ➔ Décision (0 ou 1)
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
        {/* Entrées */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              background: "#1e293b",
              border: "1px solid #38bdf8",
              padding: "10px 20px",
              borderRadius: 8,
              color: "#38bdf8",
              fontWeight: "bold",
            }}
          >
            Entrée x₁ = 1 (Poids w₁ = 0.5)
          </div>
          <div
            style={{
              background: "#1e293b",
              border: "1px solid #38bdf8",
              padding: "10px 20px",
              borderRadius: 8,
              color: "#38bdf8",
              fontWeight: "bold",
            }}
          >
            Entrée x₂ = 2 (Poids w₂ = 0.8)
          </div>
          <div
            style={{
              background: "#1e293b",
              border: "1px solid #38bdf8",
              padding: "10px 20px",
              borderRadius: 8,
              color: "#38bdf8",
              fontWeight: "bold",
            }}
          >
            Entrée x₃ = 1 (Poids w₃ = 0.4)
          </div>
        </div>

        <div style={{ fontSize: 30, color: "#64748b" }}>➔</div>

        {/* Corps du neurone */}
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            backgroundColor: isActivated ? "rgba(34, 197, 94, 0.2)" : "#1e293b",
            border: isActivated ? "4px solid #22c55e" : "3px solid #38bdf8",
            boxShadow: isActivated ? "0 0 30px rgba(34, 197, 94, 0.6)" : "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
        >
          <div style={{ fontSize: 32, fontWeight: "bold", color: "#38bdf8" }}>∑ = {sumVal}</div>
          <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>Seuil requis = 2.00</div>
        </div>

        <div style={{ fontSize: 30, color: "#64748b" }}>➔</div>

        {/* Sortie */}
        <div
          style={{
            background: isActivated ? "#16a34a" : "#334155",
            color: "#ffffff",
            padding: "16px 28px",
            borderRadius: 12,
            fontSize: 22,
            fontWeight: "bold",
            boxShadow: isActivated ? "0 0 20px rgba(34, 197, 94, 0.8)" : "none",
          }}
        >
          {isActivated ? "SORTIE : 1 (ACTIVÉ)" : "SORTIE : 0 (ÉTEINT)"}
        </div>
      </div>

      <div
        style={{
          marginTop: 50,
          backgroundColor: "#1e293b",
          padding: "10px 24px",
          borderRadius: 20,
          fontSize: 14,
          color: "#94a3b8",
          border: "1px solid #334155",
        }}
      >
        Auteur : Feugang Noussi, Bernard (Matricule 6189470) — Évaluation 2 (420-A60-BB)
      </div>
    </div>
  );
};
