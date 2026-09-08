import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const PipelineComp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stages = [
    { name: "Image 32×32", color: "#94a3b8", desc: "Chiffre « 7 »" },
    { name: "C1 (28×28)", color: "#38bdf8", desc: "6 filtres 5×5" },
    { name: "S2 (14×14)", color: "#4ade80", desc: "Pooling 2×2" },
    { name: "C3 (10×10)", color: "#38bdf8", desc: "16 filtres 5×5" },
    { name: "S4 (5×5)", color: "#4ade80", desc: "Pooling 2×2" },
    { name: "C5 (120 u.)", color: "#c084fc", desc: "Dense / Conv" },
    { name: "F6 (84 u.)", color: "#c084fc", desc: "Dense" },
    { name: "Sortie (10)", color: "#f59e0b", desc: "Pic sur « 7 »" },
  ];

  const activeStage = Math.min(stages.length - 1, Math.floor(frame / (fps * 0.6)));

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
        padding: 30,
      }}
    >
      <div style={{ fontSize: 30, fontWeight: "bold", color: "#38bdf8", marginBottom: 8 }}>
        4. Architecture Complète LeNet-5 (Yann LeCun et al., 1998)
      </div>
      <div style={{ fontSize: 16, color: "#94a3b8", marginBottom: 35 }}>
        Propagation du signal à travers les 7 couches successives (~60 000 paramètres)
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {stages.map((st, i) => {
          const isActive = i === activeStage;
          const isPassed = i <= activeStage;
          return (
            <React.Fragment key={st.name}>
              <div
                style={{
                  width: 105,
                  padding: "16px 8px",
                  borderRadius: 10,
                  backgroundColor: isActive
                    ? "rgba(56, 189, 248, 0.2)"
                    : isPassed
                    ? "#1e293b"
                    : "#0f172a",
                  border: isActive
                    ? `3px solid ${st.color}`
                    : isPassed
                    ? `1.5px solid ${st.color}`
                    : "1px dashed #334155",
                  boxShadow: isActive ? `0 0 20px ${st.color}` : "none",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: isPassed ? st.color : "#64748b",
                    marginBottom: 6,
                  }}
                >
                  {st.name}
                </div>
                <div style={{ fontSize: 10, color: isPassed ? "#e2e8f0" : "#475569" }}>{st.desc}</div>
              </div>
              {i < stages.length - 1 && (
                <div style={{ fontSize: 16, color: isPassed ? st.color : "#334155" }}>➔</div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 40,
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
