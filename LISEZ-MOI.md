# 📖 Dossier Pédagogique « Réseaux de neurones & LeNet-5 » (Projet E26/A60)

Bienvenue dans le dossier pédagogique autonome et interactif consacré aux réseaux de neurones artificiels et à l'architecture historique **LeNet-5** (Yann LeCun et al., 1998).

---

## 🚀 Comment consulter le livrable ?

Le dossier principal est réuni dans un **fichier HTML unique, autonome et sans aucune dépendance externe** :
👉 [`dossier_rxneurones_lenet5.html`](./dossier_rxneurones_lenet5.html)

- **Ouverture directe** : Double-cliquez sur le fichier HTML pour l'ouvrir dans votre navigateur web habituel (Chrome, Firefox, Safari, Edge).
- **Consultable 100 % hors ligne (`file://`)** : Zéro CDN, zéro police distante, zéro requête réseau. L'ensemble des styles CSS, scripts JavaScript vanilla et illustrations vectorielles SVG sont embarqués dans ce fichier unique.

---

## 📂 Organisation des Livrables

Le projet se compose exactement des livrables requis :

1. 📄 [`dossier_rxneurones_lenet5.html`](./dossier_rxneurones_lenet5.html) : Dossier pédagogique complet (12 sections structurées de 0 à 11, gabarit constant, 3 animations interactives pas à pas, quiz de 10 questions avec correction instantanée).
2. 📁 [`figures/`](./figures/) : 8 schémas vectoriels SVG autonomes et réutilisables (palette sobre ≤ 5 couleurs) :
   - [`fig01_neurone.svg`](./figures/fig01_neurone.svg) : Le neurone artificiel (Entrées → Somme pondérée → Seuil → Sortie).
   - [`fig02_reseau.svg`](./figures/fig02_reseau.svg) : Le réseau en immeuble à étages (Entrée → Couche cachée → Sortie avec flèches montantes).
   - [`fig03_image_pixels.svg`](./figures/fig03_image_pixels.svg) : L'image vue comme une grille de cases numérotées (0 à 255).
   - [`fig04_convolution.svg`](./figures/fig04_convolution.svg) : La convolution avec fenêtre glissante locale.
   - [`fig05_pooling.svg`](./figures/fig05_pooling.svg) : Le Max-Pooling 2×2 (compression de 4 cases vers 1 case maximale).
   - [`fig06_lenet5_pipeline.svg`](./figures/fig06_lenet5_pipeline.svg) : Pipeline architectural complet de LeNet-5 légendé par rôle.
   - [`fig07_apprentissage.svg`](./figures/fig07_apprentissage.svg) : Jauge de réduction de l'erreur au fil des tours d'entraînement.
   - [`fig08_cheque.svg`](./figures/fig08_cheque.svg) : Déploiement industriel historique sur les trieuses de chèques NCR.
3. 📄 [`LISEZ-MOI.md`](./LISEZ-MOI.md) : Présentation des livrables, guide de lecture et checklist de conformité TSA détaillée.
4. 📄 [`rapport_execution.md`](./rapport_execution.md) : Rapport d'exécution formel (Fait / Preuve / Écart).
5. 📁 [`ressources/`](./ressources/) : Documents de référence en lecture seule (articles fondateurs, chapitres théoriques).

---

## ✅ Check-list de Conformité TSA-FRIENDLY (Cahier des charges §4)

Chaque critère a été rigoureusement respecté dans la conception du dossier :

| Exigence TSA | Statut | Modalité concrète d'implémentation |
|---|:---:|---|
| **Langage littéral et concret** | ✅ Conforme | Zéro ironie, zéro implicite. Chaque analogie est explicitement ouverte par *« Imaginons que... »* et systématiquement refermée par *« En réalité, la machine... »*. |
| **Phrases courtes & claires** | ✅ Conforme | Phrases concises (≤ 20 mots en moyenne générale) et 1 seule idée directrice par paragraphe. |
| **Vocabulaire stable** | ✅ Conforme | Chaque terme technique est défini rigoureusement dès son premier usage et réutilisé à l'identique tout au long du texte. |
| **Prédictibilité & Gabarit constant** | ✅ Conforme | Chaque section adopte le gabarit strict : Titre numéroté → Objectif (1 ligne) → Paragraphes courts → Encadré « À retenir » (2 puces max) → Pictogramme de fin (`✦ ✦ ✦`). |
| **Navigation fluide et repérable** | ✅ Conforme | Sommaire complet cliquable en tête et boutons constants *« ⬅ Section précédente / Section suivante ➡ »* au bas de chaque section. |
| **Transitions explicites** | ✅ Conforme | Utilisation systématique de connecteurs ordonnés (*« D'abord... Ensuite... Enfin... »*). |
| **Code couleur constant** | ✅ Conforme | 1 couleur = 1 seul rôle dans tout le dossier (Bleu = Information/Convolution, Vert = Validation/Pooling, Ambre = Attention/Sortie/Fil rouge, Violet = Couches denses, Gris = Fond neutre). |
| **Confort sensoriel absolu** | ✅ Conforme | Fond clair reposant (`#f8fafc`), police sans-serif lisible ≥ 17px, espaces généreux, **AUCUN autoplay, AUCUN clignotement, AUCUN son**. |
| **Animations maîtrisées par l'utilisateur** | ✅ Conforme | 3 animations lentes (vitesse ≥ 1 s/étape), déclenchées uniquement au clic avec boutons de contrôle et équivalent statique (schéma SVG) toujours visible. |
| **Charge cognitive réduite** | ✅ Conforme | Découpage en blocs digestes, résumés réguliers, glossaire de 15 termes et synthèse des 10 points clés. |
| **Quiz bienveillant** | ✅ Conforme | 10 questions à choix unique avec retours explicatifs immédiats, constructifs et valorisants. |

---

## 📚 Chiffres Vérifiés & Sources Primaires

Toutes les données quantitatives figurant dans le dossier proviennent des sources documentaires authentifiées :

1. **Paramètres entraînables de LeNet-5** : **60 000 paramètres**  
   *Source primaire :* `[LeCun et al., 1998, p. 6 « only 60 000 trainable free parameters »]`.
2. **Taux d'erreur de test sur MNIST** : **0,95 % sans distorsions** et **0,8 % avec distorsions**  
   *Source primaire :* `[LeCun et al., 1998, Section III, p. 9 « stabilizes … at 0.95% » et « dropped to 0.8% »]`.
3. **Volume de tri industriel NCR** : **Millions de chèques par mois (source primaire)**  
   *Source primaire :* `[LeCun et al., 1998, Section I, p. 1 « reading millions of checks per month »]`.
4. **Part du volume des chèques américains** : **~10 % du volume US**  
   *Source secondaire :* `[Wikipédia, LeNet]` (signalé comme À RECOUPER).
5. **Ouvrage pédagogique de référence** :  
   *Neila Mezghani (2024)*, *« Apprentissage profond — Théorie et applications »*, 1re édition, Chapitres 1 à 6.
