# Secure Vibe Coding, architecture Strapi et Docker

## Decision

Strapi devient le CMS éditorial et pédagogique. Supabase reste responsable de
l'authentification et des données personnelles de l'apprenant. React/Vite reste
le frontend du MVP. Les traitements d'audit sont isolés dans un worker.

```text
Strapi       contenu publié, médias, checklists, rubrics
Supabase     Auth, profils, progression, projets, soumissions
React/Vite   expérience apprenant actuelle
Worker       contrôles automatisés et traitements asynchrones
Docker       environnement reproductible pour chaque service
```

Cette séparation évite une migration inutile de l'authentification et protège
les données personnelles contre une exposition dans le CMS.

## Modèle éditorial Strapi

La hiérarchie doit rester compatible avec les identifiants actuels :

```text
Course → Phase → Module → Lesson → Exercise
```

Les identifiants comme `react-core-m06` deviennent des identifiants métier
stables ou des `legacyId`. Ils ne doivent pas être recalculés à partir du titre.

### Course

```text
title, slug, tagline, description
icon, cover, level, duration
status: draft | review | published | archived
phases: one-to-many Phase
categories: many-to-many Category
```

### Phase

```text
course: many-to-one Course
slug, title, summary, objective
order, color, icon
modules: one-to-many Module
projectBrief: component
```

### Module

```text
phase: many-to-one Phase
moduleId, index, title, subtitle
duration, difficulty, objectives
lessons: one-to-many Lesson
quiz: one-to-one Quiz
exercises: one-to-many Exercise
status: draft | review | published | archived
```

### Lesson

```text
module: many-to-one Module
title, slug, objective, duration
content: dynamic zone
order, isRequired
quiz: one-to-one Quiz
exercises: one-to-many Exercise
resources: many-to-many Resource
```

La Dynamic Zone contient uniquement des blocs éditoriaux : texte, code,
callout, vidéo, image, exercice et checklist. Les éléments suivis ou évalués
restent des content-types autonomes.

### Exercise

```text
lesson: many-to-one Lesson
title, instructions, kind
starterFiles, solutionFiles, tests
hints, validator, template
validationMode: local | instructor | automated
```

Les champs Sandpack actuels sont protégés. `validator` est du code exécutable et
ne peut être créé ou modifié que par un formateur ou un administrateur.

## Quiz, ressources et médias

```text
Quiz
- lesson: one-to-one Lesson
- title, passingScore, attemptsAllowed
- questions: one-to-many QuizQuestion

QuizQuestion
- quiz: many-to-one Quiz
- prompt, type, explanation, order
- answers: one-to-many QuizAnswer

QuizAnswer
- question: many-to-one QuizQuestion
- label, isCorrect, feedback
```

Les bonnes réponses sont filtrées hors des payloads publics et l'évaluation
est réalisée côté serveur.

```text
Resource
- title, slug, description
- type: pdf | code | checklist | template | link
- file, externalUrl
- access: public | enrolled | instructor
- lessons: many-to-many Lesson
```

Les vidéos sont stockées chez un fournisseur vidéo. Strapi conserve le
fournisseur, l'identifiant, la durée et la transcription. Les fichiers privés
sont servis avec une URL signée après contrôle d'accès.

## Prompt → Audit → Ship

Le brief éditorial est dans Strapi, les soumissions sont dans Supabase.

```text
ProjectBrief
- course: many-to-one Course
- title, brief, deliverables
- rubric: one-to-one Rubric
- stages: one-to-many LearningStage
- checklists: many-to-many Checklist
```

```text
LearningStage
- name: prompt | audit | ship
- title, description, order
- completionRule: submitted | reviewed | approved
```

Supabase conserve `current_stage`, les URLs de dépôt et de déploiement, les
soumissions et les statuts de revue.

### Checklists réutilisables

```text
Checklist
- title, slug, description
- domain: security | performance | design | accessibility
- version, status
- items: one-to-many ChecklistItem

ChecklistItem
- checklist: many-to-one Checklist
- key, label, description, order
- severity: info | low | medium | high | critical
- verification: manual | automated | ai | mixed
- evidenceRequired: boolean
```

Un snapshot de checklist est enregistré dans Supabase au début d'un audit afin
que les résultats historiques restent cohérents après modification éditoriale.

## Rôles et publication

Strapi Admin RBAC contient les rôles administrateur, responsable pédagogique,
formateur et éditeur média. Le filtrage par cours assigné nécessite des
policies ou contrôleurs custom.

Supabase gère les rôles étudiants et, plus tard, les organisations partenaires.
Les étudiants utilisent des opérations métier contrôlées, jamais des droits
d'écriture génériques sur Strapi.

Le workflow éditorial est :

```text
draft → review → approved → published → archived
```

Strapi fournit brouillon/publication. Les champs `reviewedBy`, `reviewedAt`,
`publishedBy`, `archivedAt` et `archiveReason` portent le workflow métier.
Le versioning complet et le rollback sont reportés après le MVP.

## Frontend et migration

Le frontend React/Vite conserve ses composants et ses types actuels. Une couche
de données isole Strapi :

```text
src/lib/strapi/client.ts
src/lib/strapi/courses.ts
src/lib/strapi/mapper.ts
src/lib/strapi/types.ts
```

`mapper.ts` convertit les réponses Strapi vers `Course`, `Phase`, `Module`,
`Lesson` et `CodeExercise`. Les composants ne dépendent pas des détails REST.

Pendant la migration, un repository statique peut servir de fallback. Le
contenu Strapi devient ensuite la source principale.

## Architecture Docker

Le développement local utilise un `docker-compose.yml` avec des services
indépendants :

```text
web       frontend React/Vite, servi par Nginx en production
strapi    CMS et API
postgres  base de données Strapi
worker    audit et traitements asynchrones
```

Supabase reste un service distant au MVP. Il n'est pas dupliqué dans Docker.
Un stockage objet et un fournisseur vidéo restent également externes.

Chaque image doit avoir :

- un Dockerfile multi-stage ;
- un utilisateur non root en production ;
- une configuration par variables d'environnement ;
- un healthcheck ;
- aucun secret copié dans l'image ;
- des volumes uniquement pour les données de développement ;
- un réseau interne pour les communications privées.

Le worker est séparé du serveur Strapi afin qu'un audit lent ou indisponible ne
bloque ni le backoffice ni l'API de contenu.

Flux local :

```text
docker compose up
web → strapi → postgres
worker → Strapi/Supabase → outils d'audit
```

En production, les mêmes images peuvent être exécutées sur une plateforme
conteneurisée. Le MVP ne nécessite pas Kubernetes.

## Audit automatisé

Le worker récupère le brief et la version de checklist, puis exécute les
contrôles déterministes autorisés sur la soumission.

```text
submission Supabase
  → job worker
  → secret scan / tests / Lighthouse / lint
  → audit report Supabase
```

Un formateur valide les résultats importants.

## Roadmap

### MVP

1. Content-types Strapi et cours Secure Vibe Coding.
2. Docker Compose pour web, Strapi, PostgreSQL et worker.
3. Client Strapi et mapping des identifiants existants.
4. Remplacement progressif des imports statiques.
5. Checklists et briefs de projet.
6. Supabase pour Auth et progression.
7. Workflow brouillon/review/publié.

### V1

1. Soumissions et corrections formateur.
2. Snapshots et rubrics.
3. Worker d'audit.
4. Contrôles automatisés déterministes.
5. Certificats et statistiques.
6. Organisations, permissions avancées et SSO.
7. Versioning et rollback éditorial.

## Natif versus custom

Strapi natif couvre content-types, relations, composants, Dynamic Zones,
médias, API REST, brouillon/publication, RBAC et webhooks.

Le custom couvre le mapping React, les routes métier, les permissions par
formateur, les quiz sécurisés, les snapshots, les projets, les certificats,
les audits et les statistiques avancées.

## Vérification de conception

- Aucun remplacement inutile de Supabase n'est prévu.
- Le contenu Strapi et les données personnelles restent séparés.
- Les identifiants de progression existants sont préservés.
- Le worker est isolé du CMS.
- Docker couvre tous les composants exécutables contrôlés par le projet.
- Kubernetes, microservices supplémentaires et versioning avancé sont hors MVP.
