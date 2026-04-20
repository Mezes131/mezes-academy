# React Masterclass : Parcours interactif

Application React interactive pour apprendre React. Inspirée du cours statique `cours-react-phase3-6.html`, elle transforme le contenu pédagogique en une expérience d'apprentissage active : **quiz**, **exercices de code live**, **suivi de progression** et **navigation fluide**.

> ⚛️ Stack : Vite + React 18 + TypeScript + Tailwind + Sandpack

---

## ✨ Fonctionnalités

- **5 phases progressives** du parcours (Introduction, React Core, TypeScript, Écosystème, Expert)
- **Contenu pédagogique riche** : titres, paragraphes, leçons, boîtes d'info, exemples de code colorés
- **Quiz interactifs** (QCM à choix unique ou multiple) avec validation et explications
- **Exercices de code live** via [Sandpack](https://sandpack.codesandbox.io/) : édite et exécute directement dans le navigateur
- **Indices progressifs** pour chaque exercice, plus une solution révélable
- **Suivi de progression** : modules lus, quiz validés, exercices complétés
- **Barre de progression** globale et par phase
- **Thème clair / sombre** avec persistance
- **Favoris** pour marquer les modules à revoir
- **Recherche plein-texte** dans les modules et leçons
- **Export / Import JSON** de la progression (portable entre navigateurs)

---

## 🚀 Installation

Prérequis : Node.js ≥ 18, npm (ou pnpm / yarn / bun).

```bash
cd react-learn
npm install
npm run dev
```

L'application s'ouvre sur [http://localhost:5173](http://localhost:5173).

### Scripts

| Script | Rôle |
| --- | --- |
| `npm run dev` | Démarre le serveur de développement Vite avec HMR |
| `npm run build` | Build de production (type-check + bundle) dans `dist/` |
| `npm run preview` | Prévisualise le build de production localement |
| `npm run type-check` | Vérifie le typage TypeScript sans émettre |
| `npm run lint` | Vérifie le code avec ESLint |

---

## 🧭 Architecture

```
react-learn/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx                  # Point d'entrée React
    ├── App.tsx                   # Router + Providers
    ├── index.css                 # Variables CSS thème + Tailwind
    ├── types.ts                  # Types du domaine
    │
    ├── data/                     # 📚 Contenu pédagogique
    │   ├── intro.ts              #    Phase Introduction
    │   ├── phase3.ts             #    Phase 3 : React Core (complète)
    │   ├── scaffolds.ts          #    Phases 4, 5, 6 (structure)
    │   └── phases.ts             #    Agrégateur + helpers
    │
    ├── hooks/                    # ⚙️ Logique métier
    │   ├── useProgress.tsx       #    Contexte global de progression
    │   ├── useThemeEffect.ts     #    Synchro thème dark/light
    │   └── useSearch.ts          #    Recherche full-text
    │
    ├── components/
    │   ├── layout/               #    TopNav, Sidebar, Layout
    │   ├── ui/                   #    Button, ProgressBar, InfoBox, …
    │   └── learning/             #    Quiz, CodeExercise (Sandpack),
    │                             #    ModuleView (compositeur principal)
    │
    ├── pages/                    # 📄 Pages = routes
    │   ├── HomePage.tsx
    │   ├── PhasePage.tsx
    │   ├── ModulePage.tsx
    │   ├── ProgressPage.tsx
    │   ├── BookmarksPage.tsx
    │   └── SearchPage.tsx
    │
    └── lib/
        └── utils.ts              # cn() + helpers couleur par phase
```

### Patterns clés

- **`ProgressProvider` (Context)** : État global unique de progression, persisté dans `localStorage` et synchronisé entre onglets via l'événement `storage`.
- **Typage fort** : Toute la structure du contenu est typée (`Phase`, `Module`, `Quiz`, `CodeExercise`, `ContentBlock` en union discriminée).
- **Contenu déclaratif** : Chaque module est un objet TypeScript. Aucun composant custom à écrire pour ajouter un module : il suffit d'étoffer le tableau `phases`.
- **Séparation lecture / interaction** : Le rendu du contenu (`ModuleView`) est distinct des interactions (`Quiz`, `CodeExercise`).

---

## 📚 Ajouter du contenu

Pour ajouter un nouveau module dans une phase existante :

```ts
// src/data/phase3.ts (exemple)
{
  id: "m18b",
  index: "M18b",
  title: "Nouveau module",
  subtitle: "Une ligne de description",
  duration: "1 semaine",
  content: [
    { kind: "paragraph", html: "Texte avec <strong>HTML</strong>." },
    { kind: "info", box: { variant: "tip", title: "💡", body: "…" } },
    { kind: "lessons", items: [ { id: "x.1", title: "…", desc: "…" } ] },
  ],
  quiz: { id: "quiz-m18b", title: "…", questions: [ /* … */ ] },
  exercises: [ /* … */ ],
}
```

Les types garantissent la cohérence. Aucune modification de composant nécessaire.

### Variantes de `ContentBlock`

| kind | Usage |
| --- | --- |
| `title` | Sous-titre `H2` dans le module |
| `paragraph` | Paragraphe rédigé (HTML inline autorisé) |
| `info` | Boîte colorée (tip / warn / note / concept) |
| `highlight` | Ligne en surbrillance (idéale pour lister des points) |
| `lessons` | Liste de leçons avec tags |
| `code` | Bloc de code avec coloration syntaxique |

---

## 🎯 Exercices live (Sandpack)

Les exercices utilisent [@codesandbox/sandpack-react](https://sandpack.codesandbox.io/). Chaque exercice définit :

- Des fichiers de départ (`starterFiles`) → point de départ pour l'apprenant
- Des fichiers solution (`solutionFiles`) → révélables à la demande
- Des indices progressifs (`hints`) → dévoilés un par un
- Un template Sandpack (`react` par défaut, `react-ts` ou `vanilla`)

L'apprenant peut **reset**, **voir la solution**, et **marquer l'exercice comme terminé**.

---

## 💾 Sauvegarde de progression

La progression est stockée sous la clé `react-learn:progress:v1` dans `localStorage`. Elle contient :

- `readModules` : ids des modules lus
- `quizScores` : résultats et réponses de chaque quiz
- `completedExercises` : ids des exercices validés
- `bookmarks` : ids des modules mis en favori
- `theme` : `"dark"` ou `"light"`

### Export / Import

Depuis la page **Progression**, tu peux :
- **Exporter** ta progression en JSON (un fichier téléchargé)
- **Importer** un JSON pour restaurer ta progression sur un autre appareil
- **Réinitialiser** complètement ta progression

---

## 🗺️ Roadmap

- [ ] Ajouter quiz + exercices aux phases 4, 5, 6
- [ ] Mode "révision rapide" : re-tester les quiz anciens (spaced repetition)
- [ ] Système de badges/achievements
- [ ] Mode hors-ligne complet (service worker + PWA)
- [ ] Intégration d'un challenge final par phase
- [ ] Export PDF d'un récapitulatif personnalisé

---

## 📝 Licence

Projet pédagogique personnel. Fais-en ce que tu veux.
