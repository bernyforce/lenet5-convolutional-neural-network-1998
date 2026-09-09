# Preuves M4 — poids et chargement

Ledger: a8b3f9ce-ccc7-4199-8a01-d13e6e0bd4d2. Commit: voir rapport.

## Budgets de l'ordre 003

| Budget | Seuil | Mesure | Verdict |
|---|---|---|---|
| Image de galerie | <=200 000 o | 31 198 o (la plus lourde) | PASS |
| Images transferees au chargement | <=1 000 000 o | 60 746 o | PASS |

## Avant / apres, par image

| Image | PNG 1920x1080 | WebP 960x540 | Reduction |
|---|---|---|---|
| frame_01_0.5s.png | 17904 o | 1568 o | 92% |
| frame_02_1.2s.png | 66591 o | 4246 o | 94% |
| frame_03_1.8s.png | 116522 o | 5904 o | 95% |
| frame_04_2.5s.png | 204637 o | 8730 o | 96% |
| frame_05_3.0s.png | 211279 o | 9100 o | 96% |
| frame_06_4.0s.png | 1301575 o | 31198 o | 98% |
| **Total galerie** | **1 918 508 o** | **60 746 o** | **96,8 %** |

## Poster video

frame_06 en poster: 1 301 575 o (PNG 1920x1080) -> 51 624 o (WebP 1280x720), -96,0 %.

## Chargement

- 6 images de galerie: `loading="lazy"` + `decoding="async"` + `width`/`height` explicites (evite le decalage de mise en page).
- Avant: 0 attribut `loading` sur ces 6 images.

## Cache immutable et noms de fichiers

`server.js` envoie `Cache-Control: public, max-age=31536000, immutable`. Les nouveaux medias portent
des noms NEUFS (suffixes _960.webp / _poster1280.webp), donc aucun client ne peut servir une version
perimee depuis son cache. Verifie en HTTP: Content-Type image/webp, Cache-Control immutable.

## Masters conserves

Les PNG 1920x1080 d'origine sont conserves et toujours servis (HTTP 200, 1 301 575 o pour frame_06).

## Point de vigilance ecarte

Les GIF (01_convolution 1 371 036 o, 04_lenet5_pipeline 1 357 725 o) sont references uniquement en
`href=` (liens de telechargement), jamais en `src=`. Ils ne sont donc PAS transferes au chargement.
Ils pesent sur le disque, pas sur le reseau. L'ordre 003 demande explicitement de ne pas confondre les deux.

## Limites

- Octets transferes a cache vide/chaud non mesures en navigateur reel: BLOQUE (pas de navigateur pilote).
- Dimensions affichees reelles non mesurees au rendu; la cible 960 px est deduite de la grille CSS
  `minmax(220px, 1fr)` et du zoom 200 % (jusqu'a ~880 px d'affichage).
- Lisibilite verifiee par inspection visuelle de l'image encodee: titres et chiffres lisibles;
  les annotations fines ne le sont pas a 960 px, ni a la taille d'affichage reelle. Masters conserves.
