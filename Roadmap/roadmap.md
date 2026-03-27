# ROADMAP — tssr-memo
> Plateforme de révision pour techniciens systèmes et réseaux (TSSR / BTS SIO)
> Stack : Astro + React + nanostores + Markdown

---

## Ce qui est déjà implémenté ✅

### Architecture & Engine
- Framework Astro avec composants React (hydration client)
- Routing dynamique via `src/pages/[moduleId]/` (lesson, quiz, flashcards, exercises)
- Layout global dans `src/layouts/Layout.astro`
- **Moteur de Recherche** global indexé (Leçons + Titres) dans le Dashboard

### Store & Gamification 🎮
- State global via **nanostores** (`appStore`) avec persistance **localStorage**
- **Système XP & Niveaux** : 5 paliers (Apprenti à Maître TSSR)
- **Badges de succès** : Détection automatique des trophées (`first_module`, `linux_pro`, `windows_wizard`, `tssr_ready`)
- **Vérification rétroactive** : Les badges sont scannés au chargement initial du dashboard

### Modules de Contenu (13/13) 📚
Tous les modules sont intégrés avec cours complet, quiz (10+ Q), flashcards et exercices pratiques.

| Catégorie | Modules | État |
|-----------|---------|------|
| **Réseau** | Base des réseaux, Infrastructure, Sécurité, Virtualisation, Messagerie, Sauvegarde | ✅ Fait |
| **Windows** | Client, Services AD/DNS/DHCP, RDS/WDS/MDT, PowerShell | ✅ Fait |
| **Linux** | Base Linux, Services Réseaux, Scripting Bash | ✅ Fait |

---

## Ce qui reste à faire 🚀

### Améliorations futures (Backlog)
- [ ] **Mode Examen** : Module de simulation de l'examen final avec temps limité et questions piochées aléatoirement dans tous les modules.
- [ ] **Export PDF** : Possibilité d'exporter les fiches de révision (leçons) en PDF propre.
- [ ] **Mode Sombre / Clair** : Harmoniser parfaitement tous les composants pour un switch fluide (déjà partiellement supporté nativement).
- [ ] **Statistiques avancées** : Graphique Radar des compétences (Réseau vs Windows vs Linux) basé sur les scores des quiz.

### Maintenance
- [ ] Nettoyage des doublons de styles CSS entre `main.css` et les utilités inline.
- [ ] Migration vers `onKeyDown` pour remplacer `onKeyPress` (déprécié) dans les composants d'exercices.

---

## Conventions du Projet
- Slugs : kebab-case
- IDs standardisés : Utiliser des tirets `-` au lieu des underscores `_` pour les IDs de modules.
- Pédagogie : Toujours suivre la structure **L-C-P** (Lecture - Compréhension - Pratique).

---

## Crédits
Conçu pour la formation TSSR (Technicien Supérieur Systèmes et Réseaux).