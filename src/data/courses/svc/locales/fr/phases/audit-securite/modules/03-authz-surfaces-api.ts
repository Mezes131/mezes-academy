import type { Module } from "@/types";
import { auditSecuriteQuizzes } from "../quizzes";
import { auditSecuriteExercises } from "../exercises";

export const auditSecuriteModule03: Module = {
  id: "svc-audit-securite-m03",
  index: "03",
  title: "AuthZ et surfaces API",
  subtitle: "IDOR, routes non protégées, webhooks exposés, RLS",
  duration: "50 min",
  difficulty: "intermediate",
  objectives: [
    "Cartographier les surfaces exposées",
    "Vérifier chaque route contre l'IDOR",
    "Auditer RLS et webhooks",
  ],
  content: [
    { kind: "title", text: "Surfaces et routes" },
    {
      kind: "paragraph",
      html: "Liste tout ce qui est joignable : routes API, pages serveur, tâches en arrière-plan, webhooks. Pour chaque entrée, note <strong>qui</strong> peut l'appeler et <strong>sur quelles ressources</strong>. Un <strong>IDOR</strong>, c'est changer un id dans l'URL et lire/modifier la ressource d'un autre. C'est classique dès que l'IA vérifie seulement « connecté » sans contrôler la propriété (ownership).",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-table'></i> Matrice route × rôle",
        body: "Colonnes : route, authn requise, rôles, contrôle de propriété, verdict. Sans matrice, les /api/admin « temporaires » restent ouverts.",
      },
    },
    { kind: "title", text: "Webhooks et RLS" },
    {
      kind: "paragraph",
      html: "Les <strong>webhooks</strong> sont publics par construction : vérifie la <strong>signature</strong> du fournisseur, périmètre strict, idempotence. <strong>RLS</strong> : policies explicites en base ; « RLS activé » avec <code>USING (true)</code> ne protège rien. Le masquage d'un bouton dans React n'est <strong>pas</strong> de l'AuthZ.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-eye-slash'></i> Faux sentiment de sécurité",
        body: "Cacher Admin dans le menu et activer RLS sans lire les policies laisse la surface ouverte. Audite donc serveur et base.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-user-lock'></i> <strong>Règle</strong> : chaque surface a une authz serveur (et policies DB si pertinent). Autrement dit, une interface seule ne suffit pas.",
    },
  ],
  quiz: auditSecuriteQuizzes.m03,
  exercises: [auditSecuriteExercises.m03_1],
};
