# Mandat d'audit indépendant — M0, M2 et M3 de l'ordre 003

Mission : E26-REPRISE-QUALITE-003. Ordre canonique : `00-DIRECTION/codex-redirection-003.md`.
Émis par : Claude Code (Opus 5), rôle **exécuteur** des modules M0, M2 et M3, le 2026-09-08.
Ledgers de l'exécution auditée, tous clos en **PARTIEL** :
`256ee070-a45f-4e17-afb9-24430389c2f0` (M0 et M2), `407c43b5-11fc-4b05-9884-e587295832b8` (M3).
Branche portant les travaux : `reprise-qualite-003`.

## 0. Condition d'indépendance — lis ceci d'abord

Tu ne dois accepter ce mandat que si tu n'as **ni planifié ni exécuté** M0, M2 ou M3. L'agent qui a
produit les travaux audités est Claude Code, session unique, et il a lui-même déclaré ne pas pouvoir
se vérifier. Si tu es cette même session, **refuse** et déclare BLOQUÉ.

Tu ne valides rien sur parole. Chaque valeur attendue ci-dessous est à recalculer. Un contrôle que
tu ne peux pas exécuter reste **BLOQUÉ** — jamais PASS par supposition. Un écart, même mineur, est
un **FAIL** à documenter, pas à arrondir.

## 1. Livrables attendus de ta part

- `00-DIRECTION/reprise-M0-verification-01.md`
- `00-DIRECTION/reprise-M2-verification-01.md`
- `00-DIRECTION/reprise-M3-verification-01.md`
- Preuves sous `00-DIRECTION/preuves/reprise-M0/`, `.../reprise-M2/` et `.../reprise-M3/`
  (commandes exactes, sorties expurgées, hashes).

Format par critère : identifiant, commande exécutée, sortie obtenue, valeur attendue, verdict
PASS / FAIL / BLOQUÉ. Fiche de présence agent-ledger `start` avant, `end` après, même si FAIL.
Coordination par fichier uniquement, un seul rédacteur par fichier, verrou atomique propre, scan de
secrets avant écriture.

## 2. Interdits absolus pendant l'audit

- Ne pas arrêter ni redémarrer le processus **PID 15368** qui écoute sur le port **8080**.
  Il est préexistant à la mission.
- Ne pas modifier `C:/Users/bernyfort/Downloads/lenet5_distinct_fixed_screens_21/` — copie
  préservée, lecture seule.
- Aucune action Cloudflare, DNS, tunnel, ni `git push`, ni force-push, ni `reset --hard`.
- Ne pas supprimer de sauvegarde avant d'avoir statué sur le critère V13.
- Si tu lances un serveur, choisis un port libre **autre que 8080 et 8971**, et déclare le PID créé.

## 3. Documents audités

| Document | Rôle |
|---|---|
| `00-DIRECTION/codex-reprise-modulaire-report.md` | Réponse principale à l'ordre 003 |
| `00-DIRECTION/reprise-M0-plan.md` | Plan M0 |
| `00-DIRECTION/reprise-M0-execution.md` | Exécution M0 |
| `00-DIRECTION/reprise-M2-execution.md` | Exécution M2 (partielle) |
| `00-DIRECTION/reprise-M3-execution.md` | Exécution M3 (partielle) |
| `00-DIRECTION/preuves/reprise-M0/m0-cartographie-et-exclusions.md` | Preuves M0 |
| `00-DIRECTION/preuves/reprise-M2/m2-a03-liens-rapport-fusion.md` | Preuves M2 |
| `00-DIRECTION/preuves/reprise-M3/m3-mesures-contraste.md` | Preuves M3 |

Commits à auditer sur `reprise-qualite-003`, parent `2aeee3bf8acd18b6ca061444a56c88f7776d8baf` :

| Commit | Portée |
|---|---|
| `0f83460fd32e4787f3d40b5af9515c8228923b5c` | M0 — exclusions `_backups`, cartographie |
| `a6ea15d71820ef1a324eacae918571acada0462b` | M2 — correction des 8 liens A03 |
| `0379a57b193c321de51de609718097d406a7ba51` | docs — SHA consignés |
| `a99b52...` | docs — le présent mandat |
| `b20a08faaab81a6adac35ba95401d676af4e7155` | M3 — contraste et profondeur du thème origine |

## 4. Critères à contrôler

Racine projet, notée `$P` ci-dessous :
`/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones`

### V01 — Page publique et page locale 8080 identiques, hash exact

```bash
curl -s https://lenet5.iatuto.com/ | sha256sum
curl -s http://127.0.0.1:8080/ | sha256sum
```
Attendu pour les deux : `7031157870b79d93eaffe8a421a65d6e0169ff107ab8411c2f0a2e1d12b52339`, 137 089 octets.

### V02 — Le fichier du projet diffère de la page servie

```bash
cd "$P" && sha256sum index.html && wc -c index.html
```
Attendu : `37429e33e03882c4ba92f2f91cffb74728f65b8c6138f87c4c3ed7386ecdb081`, 132 513 octets.

### V03 — Le JS servi échoue, celui du projet passe

Extraire chaque bloc `<script>` **sans attribut `src`** puis contrôler la syntaxe :

```bash
cd "$P" && curl -s https://lenet5.iatuto.com/ -o /tmp/servi.html
python3 - <<'EOF'
import re, subprocess
for label, path in [("SERVIE", "/tmp/servi.html"), ("PROJET", "index.html")]:
    html = open(path, encoding="utf-8", errors="replace").read()
    for i, s in enumerate(re.findall(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>', html, re.S)):
        open(f"/tmp/{label}_{i}.js", "w", encoding="utf-8").write(s)
        r = subprocess.run(["node", "--check", f"/tmp/{label}_{i}.js"], capture_output=True, text=True)
        print(label, i, "rc=", r.returncode, r.stderr.strip().splitlines()[-1:] )
EOF
```
Attendu : `SERVIE` → code retour non nul, `SyntaxError: Invalid or unexpected token`.
`PROJET` → code retour 0. Un HTTP 200 ne vaut pas page fonctionnelle : c'est le cœur de A01.

### V04 — Sonde discriminante de l'arbre servi

```bash
for u in remotion-lenet5-ncr/out/frames/frame_01_0.5s.png animations/frames/frame_01_0.5s.png; do
  echo -n "$u  8080="; curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:8080/$u"
  echo -n "  public=";  curl -s -o /dev/null -w '%{http_code}\n' "https://lenet5.iatuto.com/$u"
done
ls "$P/remotion-lenet5-ncr" 2>&1 | head -1
ls /c/Users/bernyfort/Downloads/lenet5_distinct_fixed_screens_21/remotion-lenet5-ncr | head -1
```
Attendu : `remotion-lenet5-ncr/...` → 200 sur 8080 et public, **absent** du projet, **présent** dans
la copie Downloads. `animations/frames/...` → 200 partout, donc **non discriminant** : vérifie que
l'exécuteur ne s'en est pas servi comme preuve.

Conteste explicitement la conclusion de l'exécuteur : il affirme que l'arbre servi est la copie
Downloads **ou un clone exact non localisé**, le CWD du processus n'étant pas exposé. Dis si cette
marge d'incertitude est correctement posée ou si elle est présentée comme une certitude.

### V05 — Nature du site public : tunnel, pas déploiement GitHub

```bash
curl -sI https://lenet5.iatuto.com/ | tr -d '\r'
curl -sI http://127.0.0.1:8080/ | tr -d '\r'
ls "$P/wrangler.toml" "$P/.github/workflows" 2>&1
```
Attendu : mêmes en-têtes applicatifs des deux côtés (`X-Content-Type-Options`,
`X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Access-Control-Allow-Origin: *`,
`Cache-Control: no-cache`, `Content-Length` identique) ; aucun `wrangler.toml` ; aucun workflow de
déploiement. Conclusion à valider ou infirmer : **un commit ou un push ne modifie pas la page
publique**. L'hôte portant le tunnel est déclaré non identifié — confirme que ce point reste BLOQUÉ
et non conclu.

### V06 — Processus 8080 préexistant et non touché

PowerShell :
```powershell
$c = Get-NetTCPConnection -LocalPort 8080 -State Listen
Get-Process -Id $c.OwningProcess | Select-Object Id, ProcessName, StartTime
```
Attendu : PID 15368, `node`, démarrage 2026-09-08 06:19:31, toujours vivant.

### V07 — Exclusion Git de `_backups`

```bash
cd "$P" && git check-ignore -v _backups/E26-REPRISE-QUALITE-003/M0/20260908-213007/server.js
git status --porcelain | grep -c _backups
git log --all --name-only --format="" -- '_backups/*' | sort -u | head
```
Attendu : règle `.gitignore:29` → `**/_backups/` ; `0` occurrence dans `status` ; **aucun** fichier
`_backups/` n'a jamais été committé.

### V08 — Exclusion HTTP de `_backups`, mesurée et non lue dans le code

Lance le `server.js` du projet sur un port libre de ton choix (ni 8080 ni 8971), lié à `$P` :

```bash
cd "$P" && PORT=<TON_PORT_LIBRE> HOST=127.0.0.1 node server.js &
for u in "_backups/" \
         "_backups/E26-REPRISE-QUALITE-003/M0/20260908-213007/server.js" \
         "_backups/codex-ordre-003/20260908-212125-832/start-.agent-ledger-open.json"; do
  echo -n "/$u -> "; curl -s -o /dev/null -w '%{http_code}\n' "http://127.0.0.1:<TON_PORT_LIBRE>/$u"
done
```
Attendu : **403** sur les trois, dont le `.json` qui n'était pas couvert avant le correctif.

Piège à contrôler : sur le port 8080, `/_backups/` renvoie **404**, ce qui ne prouve **aucune**
exclusion — ce 404 vient de ce que l'arbre servi est un autre dossier. Vérifie que l'exécuteur a
bien écarté ce piège au lieu de s'en servir comme preuve.

### V09 — Correctif `server.js` minimal et syntaxiquement valide

```bash
cd "$P" && node --check server.js && echo "rc=0"
git diff 2aeee3b..0f83460 -- server.js .gitignore
```
Attendu : `rc=0` ; diff limité à **1 ligne ajoutée** dans `server.js`
(`pathParts.includes('_backups') ||`) et **4 lignes ajoutées** dans `.gitignore`. Aucune autre
modification, aucun « nettoyage » de code adjacent.

### V10 — Les 8 liens A03 résolus depuis le dossier du rapport

```bash
cd "$P" && n=0; ok=0
for t in $(grep -o '](\([^)]*\))' 00-DIRECTION/codex-merge-links-report.md | sed 's/^](//;s/)$//'); do
  n=$((n+1)); [ -e "00-DIRECTION/$t" ] && ok=$((ok+1)) || echo "MANQUANT $t"
done; echo "$ok/$n resolues"
grep -c 'file://\|00-DIRECTION/00-DIRECTION' 00-DIRECTION/codex-merge-links-report.md
sha256sum 00-DIRECTION/codex-merge-links-report.md
```
Attendu : `8/8 resolues` ; `0` résidu ; hash
`849bdc433f218027904aa1508876af06e5380c41ec137089abbaacbb07e576c9`.

La base de résolution correcte est `00-DIRECTION/`, dossier du rapport. Contrôle aussi qu'aucune
**mention textuelle** de protocole n'a été transformée en lien, et qu'aucun vrai lien n'a été
laissé de côté au motif qu'il ressemblait à du texte.

### V11 — Cliquabilité effective : BLOQUÉ à lever si tu es équipé

L'exécuteur n'a **pas** de navigateur piloté et a déclaré ce critère BLOQUÉ, en ne prouvant que la
résolution de chemin sur disque. Si tu disposes d'un navigateur piloté, effectue les clics réels
depuis le rendu de `codex-merge-links-report.md` dans l'interface de livraison et capture le
résultat. Sinon, maintiens **BLOQUÉ** : ne convertis pas une résolution de chemin en cliquabilité.

### V12 — Prévisualisation liée au commit

```bash
cd "$P" && git show a6ea15d:index.html | sha256sum
curl -s http://127.0.0.1:<TON_PORT_LIBRE>/ | sha256sum
```
Attendu : les deux égaux à
`37429e33e03882c4ba92f2f91cffb74728f65b8c6138f87c4c3ed7386ecdb081`. Contrôle en outre que la page
servie par cette prévisualisation passe `node --check` là où la page publique échoue (V03).

### V13 — Récupération avant suppression des sauvegardes

L'exécuteur a **conservé** les sauvegardes, faute de vérification indépendante. C'est à toi de
statuer. Preuve de récupération à recalculer :

```bash
cd "$P"
for p in ".gitignore:_backups/E26-REPRISE-QUALITE-003/M0/20260908-213007/.gitignore" \
         "server.js:_backups/E26-REPRISE-QUALITE-003/M0/20260908-213007/server.js" \
         "00-DIRECTION/codex-merge-links-report.md:_backups/E26-REPRISE-QUALITE-003/M2/20260908-213116/codex-merge-links-report.md"; do
  f="${p%%:*}"; b="${p##*:}"
  echo "$f  git=$(git show "2aeee3b:$f" | sha256sum | cut -d' ' -f1)  bak=$(sha256sum "$b" | cut -d' ' -f1)"
done
```
Valeurs attendues, `git show` et sauvegarde devant être **identiques** pour chaque ligne :

| Fichier | SHA-256 avant modification |
|---|---|
| `.gitignore` | `92067511569bfebda6eb66bc5efe17776c1d2751ae4db16d9e9852c99353fc51` |
| `server.js` | `2a6e8477891ac45fc303e7fb94315843287ba8bf750394ae478614d94e06e339` |
| `00-DIRECTION/codex-merge-links-report.md` | `b764270e7155459d6b8a269eaac6a80203ce0e843947b1449e33775643b070f5` |

Si et seulement si les trois concordent **et** que M0 et M2 sont PASS, la suppression des
sauvegardes de ces deux modules est autorisée. Avant toute suppression : résoudre le chemin absolu,
contrôler qu'il reste sous `_backups/E26-REPRISE-QUALITE-003/<module>/`, vérifier l'absence de lien
symbolique, journaliser les fichiers supprimés et le commit de récupération. Ne touche à **aucune**
sauvegarde historique ni à `_backups/codex-ordre-003/` qui appartient à un autre agent.

### V14 — Honnêteté des rapports audités

Contrôle que les rapports ne revendiquent rien au-delà du prouvé. En particulier :

- A06, M1, M3, M4 doivent rester **BLOQUÉS**, sans PASS déguisé.
- Aucun PASS de module ne doit être prononcé par l'exécuteur.
- Aucune identité d'agent inventée, aucun rôle fictif de vérificateur.
- Les auto-corrections annoncées doivent correspondre aux faits : 8 liens et non 7 ; navigation non
  réparée au cycle précédent ; site public requalifié en tunnel et non en déploiement Pages.
- Le force-push antérieur à l'ordre 003 doit être déclaré (section 7 de la réponse principale).

Si tu trouves une affirmation non étayée, c'est un **FAIL** de rapport, indépendamment de l'état
technique du code.

## 5. Critères M3 — contraste et lisibilité du thème origine

Module audité : commit `b20a08faaab81a6adac35ba95401d676af4e7155`, fichier `index.html`
(132 513 → 135 561 octets ; SHA-256 après :
`61f850e496f3e81b7ce544c3236909ee2539bdd65eee802aafe6b17ecba0a34c`).

Avertissement méthodologique à contrôler en priorité : l'exécuteur a d'abord mesuré le **mauvais
thème**. Il a pris les jetons sombres de `:root` pour la palette d'`origine`, et a conclu à tort que
le lien Colab était conforme à 9,30:1 avant de se corriger à 1,36:1. Vérifie que cette erreur est
bien documentée dans `reprise-M3-execution.md` §1 et qu'aucune valeur issue de la première série
erronée ne subsiste dans les rapports.

### V15 — `origine` est bien un thème clair, et les jetons `:root` sont des replis

```bash
cd "$P"
sed -n '/body\[data-theme="origine"\] {/,/}/p' index.html
grep -c 'body\[data-theme="origine"\]' index.html
grep -n -- '--text-main\|--bg-void' index.html | head -4
```
Attendu : le bloc `origine` fixe `background-color` clair et `color: #0f172a` en `!important` ; les
jetons sombres de `:root` ne s'appliquent donc pas à `origine`. Toute mesure de contraste d'`origine`
faite contre `#030712` est invalide.

### V16 — Recalcul indépendant des ratios corrigés

Recalcule sans réutiliser le script de l'exécuteur, ou réécris-le. Composition alpha obligatoire là
où un fond est translucide. Formule WCAG 2.x : luminance relative sRGB, `(L1+0.05)/(L2+0.05)`.

| Élément | Couleurs déclarées | Ratio attendu | Seuil |
|---|---|---|---|
| Lien Colab, pilule, clair | `#0a58ca` sur `#ddf4ff` | 5,66:1 | 4,5 |
| Bordure pilule Colab, clair | `#0969da` sur `#ddf4ff` | 4,56:1 | 3,0 |
| Lien Colab, onglet, clair | `#334155` sur `#ffffff` (via `.tab-btn`, couleur imposée par le bloc M3 qui suit la règle d'origine) | 10,35:1 | 4,5 |
| Bordure de contrôle, clair | `#8c959f` sur `#ffffff` | 3,04:1 | 3,0 |
| Texte secondaire, clair | `#656d76` sur `#eef2f7` | 4,67:1 | 4,5 |
| Texte principal, clair | `#0f172a` sur `#eef2f7` | ≈17:1 | 4,5 |
| Lien Colab, pilule, sombre | `#7dd3fc` sur `rgba(56,189,248,0.14)` composé sur la barre sombre | 9,64:1 | 4,5 |
| Bordure pilule, sombre | `rgba(56,189,248,0.6)` composé sur la barre sombre | ≈3,9:1 | 3,0 |

Un écart supérieur à 0,05 sur un ratio est un **FAIL** à documenter. Conteste aussi le **cadrage** :
l'exécuteur a appliqué 1.4.11 (≥3:1) aux bordures de **composants** et non aux séparateurs
décoratifs de cartes, qu'il a seulement rendus visibles (`#d0d7de` = 1,45:1). Dis si cette
distinction est correcte au regard de WCAG 2.2, ou si des bordures essentielles restent sous 3:1.
Référence : https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html

### V17 — Plus aucune couleur Colab en style inline

```bash
cd "$P"
grep -n 'color:#93c5fd\|color:#38bdf8' index.html
grep -c 'colab-pill' index.html
grep -n 'Google Colab' index.html | head -3
```
Attendu : **0** occurrence des deux couleurs inline ; `colab-pill` présent (1 usage HTML +
2 définitions CSS) ; le lien en onglet ne porte plus que `text-decoration:none`. Le point de fond :
un style inline échappe aux surcharges de thème, ce qui est la cause d'origine du défaut.

### V18 — Confinement : les thèmes sombres ne sont pas modifiés

```bash
cd "$P"
git diff 0379a57..b20a08f -- index.html
git diff 0379a57..b20a08f --stat
```
Attendu : uniquement des **ajouts** en fin de `<style>` (bloc délimité `M3 — CONTRASTE`), plus les
deux retraits de couleur inline. **Aucune** modification des blocs `theme-1`, `theme-2`, `theme-3`,
ni des jetons `:root`. Signale toute réécriture de règle existante ou tout « nettoyage » adjacent.

### V19 — Focus visible et animations réduites

```bash
cd "$P"
grep -c ':focus-visible' index.html
grep -c 'prefers-reduced-motion' index.html
git show 0379a57:index.html | grep -c ':focus\|outline'
```
Attendu : `:focus-visible` présent (2 règles), `prefers-reduced-motion` présent (1 bloc), et **0**
dans la version d'avant — le document n'avait aucun indicateur de focus. Vérifie que l'anneau atteint
≥3:1 : `#0a58ca` sur blanc = 6,44:1 ; `#7dd3fc` sur fond sombre = 11,85:1.
Références : 2.4.7 Focus Visible, 2.3.3 Animation from Interactions.

### V20 — Profondeur : la cause du rendu plat

Calcule la clarté CIE L\* (`L* = 116·Y^(1/3) − 16` pour `Y > 0.008856`) :

| Mesure | Avant | Après | Attendu |
|---|---|---|---|
| page vs carte, ratio | `#f8fafc`/`#ffffff` | `#eef2f7`/`#ffffff` | 1,046 → 1,124 |
| page vs carte, ΔL\* | — | — | 1,8 → 4,7 |
| bordure de carte | `#e2e8f0` | `#d0d7de` | 1,23 → 1,45:1 |

Juge si la justification tient : l'exécuteur soutient que le ratio de contraste est un mauvais
indicateur de séparation de surfaces et qu'il faut raisonner en L\* perceptuel. Valide ou réfute.

### V21 — Intégrité technique après patch

```bash
cd "$P"
python3 - <<'EOF'
import re
h=open("index.html",encoding="utf-8").read()
st=re.search(r'<style>(.*?)</style>',h,re.S).group(1)
print("accolades:", st.count('{'), st.count('}'), st.count('{')==st.count('}'))
for i,s in enumerate(re.findall(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>',h,re.S)):
    open(f"/tmp/v21_{i}.js","w",encoding="utf-8").write(s)
EOF
for f in /tmp/v21_*.js; do node --check "$f" && echo "$f rc=0"; done
```
Attendu : accolades équilibrées (256/256) et `node --check` à 0 sur chaque bloc.

### V22 — La prévisualisation sert bien le fichier du commit

```bash
cd "$P" && git show b20a08f:index.html | sha256sum
curl -s http://127.0.0.1:<TON_PORT_LIBRE>/ | sha256sum
```
Attendu : les deux égaux à
`61f850e496f3e81b7ce544c3236909ee2539bdd65eee802aafe6b17ecba0a34c`.
Rappel : le port 8080 et le domaine public servent un **autre** arbre et ne refléteront pas ce
correctif — ne conclus pas à un échec du patch sur cette base (voir V04, V05).

### V23 — Vérification au rendu : BLOQUÉ à lever si tu es équipé

L'exécuteur n'a produit que des mesures **statiques** sur valeurs déclarées. Si tu disposes d'un
navigateur piloté, exécute et documente, sur le thème `origine` **et** sur les trois thèmes sombres :

1. Couleurs **calculées** (`getComputedStyle`) et fonds composites réels de chaque composant.
2. États `:hover`, `:focus-visible` et `:active` de chaque contrôle, ratio mesuré à chacun.
3. Visibilité effective de l'anneau de focus au parcours clavier complet (Tab / Shift+Tab).
4. Zoom 200 % et rendu mobile : pas de perte de texte, cibles tactiles ≥ 44 px.
5. `prefers-reduced-motion: reduce` activé : les animations cessent réellement.
6. `pageerror`, `console.error` et erreurs réseau capturés pendant le parcours.

Sinon, maintiens **BLOQUÉ** sur chacun de ces six points. Ne convertis aucun calcul statique en
validation de rendu.

### V24 — Périmètre non couvert, à confirmer comme tel

L'exécuteur déclare hors périmètre : les thèmes 1, 2 et 3 (non audités en contraste), l'échelle
typographique, la longueur de ligne, les cibles tactiles, et la dette de jetons (250 couleurs codées
en dur pour 101 usages de jetons, 44 teintes distinctes). Confirme que ces éléments sont bien
déclarés non traités et non présentés comme réglés.

## 6. Verdict attendu

Un verdict par module — M0, M2 et M3 — chacun PASS / FAIL / BLOQUÉ, avec le détail par critère
V01-V24. Un FAIL renvoie à l'exécuteur, puis à un **nouveau** vérificateur indépendant. Aucun PASS
global de la mission n'est possible tant que M1 et M4 restent non livrés, et M3 ne peut être PASS
complet sans la vérification au rendu de V23.

Pour la suppression des sauvegardes, le critère V13 s'applique aussi à M3 : la version d'avant
modification d'`index.html` est
`37429e33e03882c4ba92f2f91cffb74728f65b8c6138f87c4c3ed7386ecdb081` (132 513 octets), récupérable via
`git show 0379a57:index.html`, et sauvegardée sous
`_backups/E26-REPRISE-QUALITE-003/M3/20260908-215021/index.html`.
