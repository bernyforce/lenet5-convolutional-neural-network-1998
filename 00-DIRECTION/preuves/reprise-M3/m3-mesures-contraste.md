# Preuves M3 — mesures de contraste, theme origine (CLAIR) et themes sombres

Methode: valeurs declarees extraites du CSS, composition alpha calculee,
ratios WCAG 2.2 (1.4.3 texte >=4.5:1, 1.4.11 non-texte essentiel >=3:1).
LIMITE: calcul statique. Le rendu navigateur (styles calcules, empilement
reel, focus, zoom 200%, mobile) n'est PAS verifie ici.

## Profondeur (cause du rendu plat)

| Mesure | Avant | Apres |
|---|---|---|
| page vs carte, ratio | 1.046:1 | 1.124:1 |
| page vs carte, deltaL* | 1.8 | 4.7 |
| bordure de carte | #e2e8f0 = 1.23:1 | #d0d7de = 1.45:1 |

## Corrections, avant / apres

| Element | Avant | Apres | Seuil | Verdict |
|---|---|---|---|---|
| Lien Colab, pilule (clair) | #93c5fd sur pilule = 1.36:1 | #0a58ca sur #ddf4ff = 5.66:1 | >=4.5 | PASS |
| Lien Colab, onglet (clair) | #38bdf8 sur barre = 2.13:1 | #334155 via .tab-btn = 10.35:1 | >=4.5 | PASS |
| Bordure pilule Colab (clair) | bleu 50% sur barre = 2.14:1 | #0969da sur #ddf4ff = 4.56:1 | >=3.0 | PASS |
| Bordure de controle (clair) | #cbd5e1 sur #f1f5f9 = 1.36:1 | #8c959f sur blanc = 3.04:1 | >=3.0 | PASS |
| Texte secondaire (clair) | #64748b sur page = 4.55:1 | #656d76 sur page = 4.67:1 | >=4.5 | PASS |
| Lien Colab, pilule (sombre) | inchange = n/a | #7dd3fc sur pilule = 9.64:1 | >=4.5 | PASS |

## Ajouts d'accessibilite

- Focus visible: aucun `:focus`/`outline` n'existait (0 occurrence). Anneau #0a58ca = 6.44:1 sur blanc, #7dd3fc = 11.85:1 sur fond sombre. Seuil 2.4.7 / 1.4.11 >=3:1.
- `prefers-reduced-motion`: aucune prise en charge auparavant (0 occurrence).
