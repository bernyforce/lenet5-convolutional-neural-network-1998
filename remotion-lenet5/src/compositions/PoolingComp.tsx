import React from "react";
import { useCurrentFrame } from "remotion";

export const PoolingComp: React.FC = () => {
  const frame = useCurrentFrame();

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
        3. Le Max-Pooling : Compression &amp; Invariance Spatiale
      </div>
      <div style={{ fontSize: 18, color: "#94a3b8", marginBottom: 50 }}>
        Réduction des dimensions par 2 en ne conservant que le signal dominant le plus fort
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
        {/* Grille 2x2 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 18, fontWeight: "bold", color: "#e2e8f0", marginBottom: 15 }}>
            Zone 2×2 (4 Pixels)
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 90px)",
              gridGap: 8,
              backgroundColor: "#1e293b",
              padding: 14,
              borderRadius: 10,
              border: "1px solid #334155",
            }}
          >
            <div
              style={{
                width: 90,
                height: 90,
                backgroundColor: "#0f172a",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "#64748b",
              }}
            >
              12
            </div>
            <div
              style={{
                width: 90,
                height: 90,
                backgroundColor: "rgba(34, 197, 94, 0.25)",
                border: "3px solid #22c55e",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: "bold",
                color: "#4ade80",
                boxShadow: "0 0 15px rgba(34, 197, 94, 0.4)",
              }}
            >
              88 ⭐
            </div>
            <div
              style={{
                width: 90,
                height: 90,
                backgroundColor: "#0f172a",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "#64748b",
              }}
            >
              20
            </div>
            <div
              style={{
                width: 90,
                height: 90,
                backgroundColor: "#0f172a",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "#64748b",
              }}
            >
              45
            </div>
          </div>
        </div>

        <div style={{ fontSize: 36, color: "#22c55e" }}>➔ Max-Pool ➔</div>

        {/* Résultat 1 case */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 18, fontWeight: "bold", color: "#e2e8f0", marginBottom: 15 }}>
            Sortie Condensée (1 Valeur)
          </div>
          <div
            style={{
              width: 120,
              height: 120,
              backgroundColor: "#16a34a",
              borderRadius: 12,
              border: "3px solid #86efac",
              boxShadow: "0 0 25px rgba(34, 197, 94, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            88
          </div>
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
