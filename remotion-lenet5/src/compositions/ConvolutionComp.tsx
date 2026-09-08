import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const ConvolutionComp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Grid size 5x5
  const grid = [
    [0, 255, 255, 255, 0],
    [0, 0, 0, 255, 0],
    [0, 0, 255, 0, 0],
    [0, 255, 0, 0, 0],
    [0, 255, 0, 0, 0],
  ];

  // Animate position (9 positions for 3x3 filter on 5x5 grid)
  const posIndex = Math.min(8, Math.floor(frame / (fps * 0.8)));
  const filterRow = Math.floor(posIndex / 3);
  const filterCol = posIndex % 3;

  const currentVal = interpolate(frame % (fps * 0.8), [0, fps * 0.4], [0, 240], {
    extrapolateRight: "clamp",
  });

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
        1. La Convolution en Mouvement (Filtre Glissant 3×3)
      </div>
      <div style={{ fontSize: 18, color: "#94a3b8", marginBottom: 40 }}>
        Le filtre balaye l'image pas à pas pour détecter les contours du chiffre « 7 »
      </div>

      <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
        {/* Grille Source */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 18, fontWeight: "bold", color: "#e2e8f0", marginBottom: 15 }}>
            Image d'Entrée (5×5)
          </div>
          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "repeat(5, 50px)",
              gridGap: 4,
              backgroundColor: "#1e293b",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #334155",
            }}
          >
            {grid.map((row, r) =>
              row.map((val, c) => (
                <div
                  key={`${r}-${c}`}
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: val > 0 ? "#334155" : "#0f172a",
                    border: "1px solid #475569",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    color: val > 0 ? "#38bdf8" : "#64748b",
                    fontWeight: val > 0 ? "bold" : "normal",
                  }}
                >
                  {val}
                </div>
              ))
            )}

            {/* Bounding box du filtre animé */}
            <div
              style={{
                position: "absolute",
                top: 10 + filterRow * 54,
                left: 10 + filterCol * 54,
                width: 158,
                height: 158,
                border: "3px solid #38bdf8",
                backgroundColor: "rgba(56, 189, 248, 0.25)",
                borderRadius: 6,
                boxShadow: "0 0 15px rgba(56, 189, 248, 0.5)",
                transition: "all 0.3s ease",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#0284c7",
                  color: "#ffffff",
                  fontSize: 11,
                  fontWeight: "bold",
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                Filtre 3×3
              </div>
            </div>
          </div>
        </div>

        {/* Flèche de transformation */}
        <div style={{ fontSize: 36, color: "#38bdf8" }}>➔</div>

        {/* Carte de caractéristiques (Sortie) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 18, fontWeight: "bold", color: "#e2e8f0", marginBottom: 15 }}>
            Carte de Traits (Feature Map 3×3)
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 60px)",
              gridGap: 6,
              backgroundColor: "#1e293b",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #334155",
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
              const isFilled = idx <= posIndex;
              const isCurrent = idx === posIndex;
              return (
                <div
                  key={idx}
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: isCurrent
                      ? "rgba(34, 197, 94, 0.3)"
                      : isFilled
                      ? "#1e3a8a"
                      : "#0f172a",
                    border: isCurrent
                      ? "2px solid #22c55e"
                      : isFilled
                      ? "1px solid #38bdf8"
                      : "1px dashed #475569",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: isCurrent ? "#4ade80" : isFilled ? "#bae6fd" : "#475569",
                  }}
                >
                  {isFilled ? (isCurrent ? Math.round(currentVal) : 180) : "-"}
                </div>
              );
            })}
          </div>
        </div>
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
