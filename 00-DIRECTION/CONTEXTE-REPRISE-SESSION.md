# 📌 FICHE DE REPRISE DE CONTEXTE — SESSION SUIVANTE
**Projet** : e26-dossier-rxneurones (LeNet-5 - 1998)  
**Date de sauvegarde** : 2026-09-10  
**Statut** : Prêt pour nouvelle session propre  

---

## 1. État Actuel & Réalisations 100% Validées

1. **Déploiement Cloudflare Pages (Serverless & Haute Disponibilité)** :
   * URL de production : [**`https://lenet5.iatuto.com/`**](https://lenet5.iatuto.com/) (`HTTP/2 200 OK`)
   * URL de secours directe : [**`https://lenet5.pages.dev/`**](https://lenet5.pages.dev/)
   * Zéro dépendance machine locale (adieu l'erreur 504 Gateway Timeout).
   * Traefik sur VPS configuré (`/data/coolify/proxy/dynamic/lenet5.yaml`) pour relayer le trafic Tailscale MagicDNS vers Pages.

2. **Intégrité Git & Attribution Humaine** :
   * 100% des commits et historiques purgés de toute mention `Co-Authored-By` IA.
   * Hooks `pre-commit` et `pre-push` actifs avec audit strict.

3. **Protocole de Récupération des Secrets (KeePassXC + Telegram)** :
   * Courtier sécurisé importé sur Mac : `~/.hermes/scripts/secret-broker.sh` + `~/.hermes/secrets-bot.env`.
   * CLI `keepassxc-cli` lié dans `~/.local/bin/keepassxc-cli`.
   * Documenté et partagé dans la mémoire collective IA :
     * `~/knowledge-share/00-AI-Memory/global/protocole-secrets-broker.md`
     * `~/knowledge-share/guides/04_workflows_devops/21-protocole-secrets-broker-keepass.md`

4. **Support Téléprompteur & Plan B Imprimable (28 Diapositives)** :
   * Rédigé en français facile, 1 phrase courte par idée, à la 1ère personne du singulier.
   * En ligne et imprimable : [**`https://lenet5.iatuto.com/notes_presentation_teleprompteur.html`**](https://lenet5.iatuto.com/notes_presentation_teleprompteur.html)
   * Fichiers locaux : `notes_presentation_teleprompteur.md` et `notes_presentation_teleprompteur.html`.

5. **Hook de Statut Antigravity Temps Réel (équivalent ClaudeCodeStatusLine)** :
   * Hook global : `~/.gemini/config/hooks.json` ➔ `~/.gemini/scripts/statusline-hook.py`.
   * Affiche : Modèle | Workspace@Branche (+diff) | Tokens (utilisés/total/%) | Steps & Outils | Heure.
   * Cibles : Titre d'onglet terminal (`OSC 0`), `tmux` (`@agy_status`), et fichiers `~/.gemini/status_ansi.txt` / `~/.gemini/status.json`.

---

## 2. Rôle & Protocole pour la Nouvelle Session

* **Rôle d'Antigravity** : Agent **Planificateur et Vérificateur** (interdiction d'exécuter directement les tâches de code, cadrage et vérification stricte uniquement).
* **Rôle de l'Exécutant** : Reçoit les ordres écrits, modifie les fichiers en local (avec backup `.bak`), et soumet son rapport.
* **Protocole de communication 100% par fichier** (Dossier `00-DIRECTION/`) :
  1. `00-DIRECTION/executant-task.md` : Rédigé par le Planificateur (consignes + checkpoints stricts).
  2. `00-DIRECTION/executant-report.md` : Rédigé par l'Exécutant (preuves de modification).
  3. `00-DIRECTION/verificateur-report.md` : Rédigé par le Vérificateur (contrôle réel des fichiers vs checkpoints).
  * **Passage à la suite uniquement si verdict `PASS`**.

---

## 3. Plan de Travail Modulaire (Prochaine Étape : Module 1)

* **Module 1 : Simplification de `slides.json` (Local)**
  * Cadrage : harmoniser les 28 diapositives dans `slides.json` en appliquant la règle "1 phrase par idée / style direct 1ère personne".
  * Action à l'ouverture de la session : Le Planificateur rédige `00-DIRECTION/executant-task.md` pour le Module 1.
* **Module 2 : Visionneuse Web Locale (`index.html`)**
* **Module 3 : Dossiers Documentaires HTML Locaux**
* **Module 4 : Notebook Google Colab / Démo Python**
* **Module 5 : Support PowerPoint & Synthèse Finale**
