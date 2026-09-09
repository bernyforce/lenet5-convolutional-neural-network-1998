# Preuves — sémantique ARIA et contraste des thèmes 1/2/3

Ledger : `da641fb4-76a8-40ad-bd56-93e75b34b0aa`.

## 1. Contraste `--text-dim` sur les thèmes sombres

Fonds pris au **pic des dégradés**, c'est-à-dire au point le plus clair de chaque thème,
qui est le pire cas pour du texte clair. Ces thèmes ne surchargent aucun jeton `--*`,
donc la valeur de `:root` s'y applique.

| Thème | Avant `#64748b` | Après `#8b98ab` | Seuil | Verdict |
|---|---|---|---|---|
| theme-1 (fond) | 2.82:1 | 4.59:1 | 4,5 | PASS |
| theme-2 (fond) | 4.14:1 | 6.73:1 | 4,5 | PASS |
| theme-3 (fond) | 2.80:1 | 4.55:1 | 4,5 | PASS |
| theme-1 (panneau) | 3.55:1 | 5.77:1 | 4,5 | PASS |
| theme-2 (panneau) | 3.87:1 | 6.30:1 | 4,5 | PASS |
| theme-3 (panneau) | 3.58:1 | 5.83:1 | 4,5 | PASS |

Hiérarchie préservée : `--text-muted #94a3b8` reste plus clair que `--text-dim #8b98ab`.
Marge mince assumée : 4,55:1 au pic du dégradé du thème 3, contre un seuil de 4,50.

## 2. Thème clair : le jeton est scopé

Éclaircir `--text-dim` aurait dégradé le thème clair. Le jeton est donc redéfini pour `origine` :
`#656d76` = 4.67:1 sur la page, 5.25:1 sur carte blanche.
L'ancien `#64748b` y était à 4.23:1, sous le seuil.

## 3. Sémantique ARIA ajoutée

| Élément | Avant | Après |
|---|---|---|
| Boutons d'onglet | aucun rôle | `role="tab"`, `aria-selected`, `aria-controls`, `id` (5) |
| Panneaux | aucun rôle | `role="tabpanel"`, `aria-labelledby` (5) |
| `switchTab()` | ne changeait que la classe | synchronise `aria-selected` |
| Menu de thèmes | `aria-expanded="false"` figé | piloté à l'ouverture et à la fermeture |
| Minuteur | `<div>` nu | `role="timer"`, `aria-live="off"`, `aria-label` |

`aria-live="off"` est délibéré : une annonce par seconde serait nuisible aux lecteurs d'écran.

## 4. Écart assumé et non masqué

Le patron WAI-ARIA complet exige un `role="tablist"` ne contenant **que** des onglets, plus une
navigation par flèches. Or le conteneur `.tabs` mêle 5 boutons d'onglet et 2 liens externes
(GitHub, Colab). Un `tablist` conforme imposerait de restructurer le DOM, dont l'impact sur la
mise en page ne peut pas être vérifié sans rendu. `role="tablist"` n'est donc **pas** ajouté et
la navigation par flèches **pas** implémentée. À trancher par un vérificateur équipé d'un navigateur.

## 5. Limites

- Aucun test avec un lecteur d'écran réel : BLOQUÉ.
- Contrastes calculés statiquement, pics de dégradés estimés depuis les déclarations CSS,
  et non échantillonnés sur un rendu réel.
- États `:hover` et `:active` des onglets non remesurés.
