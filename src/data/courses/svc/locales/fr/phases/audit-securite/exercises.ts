import type { AuditExercise } from "@/types";

export const auditSecuriteExercises: Record<
  "m01_1" | "m02_1" | "m02_2" | "m03_1" | "m04_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-audit-securite-ex-m01-1",
    format: "audit",
    title: "Trouver et corriger cinq fuites",
    instructions:
      "Audite le dépôt piégé. Coche les constats justes sur secrets, historique et rotation.",
    hints: [
      "Code + .env versionné + Docker + historique = surfaces de fuite.",
      "Corriger le fichier sans faire de rotation laisse le secret encore compromis.",
    ],
    scenario: `<p>Dépôt « généré par IA » : clé Stripe dans <code>src/lib/stripe.ts</code>, <code>.env</code> committé, <code>Dockerfile</code> qui <code>COPY .env</code>, jeton GitHub dans un README d'exemple, et la clé a déjà été poussée il y a trois commits (même si le fichier actuel est « nettoyé »).</p>
<p>Objectif : identifier au moins cinq fuites / mauvaises pratiques et le bon correctif (ignore + coffre + rotation).</p>`,
    findings: [
      {
        id: "f1",
        label: "Clé API / secret collé dans le code source = fuite critique à retirer et tourner",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: ".env versionné doit être retiré du suivi Git et listé dans .gitignore",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Copier .env dans l'image Docker expose les secrets à l'exécution / au registre",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label: "Un secret déjà poussé reste dans l'historique git : rotation obligatoire",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f5",
        label: "Jetons « d'exemple » dans le README peuvent être de vrais secrets scrapés",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f6",
        label: "Effacer la ligne du fichier courant suffit, même sans rotation ni ignore",
        correct: false,
      },
      {
        id: "f7",
        label: "Mettre la clé secrète dans VITE_/NEXT_PUBLIC_ côté client est sûr",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Cinq surfaces typiques : code, .env tracké, Docker, README, historique. Correctifs : placeholders, gitignore/dockerignore, coffre / variables d'exécution, rotation des secrets exposés.</p>`,
  },

  m02_1: {
    id: "svc-audit-securite-ex-m02-1",
    format: "audit",
    title: "Exploiter et corriger une injection",
    instructions:
      "Coche ce qui est vrai sur l'injection et le correctif (SQL/NoSQL/commande).",
    hints: [
      "Concaténation = signal rouge.",
      "Les paramètres liés et les APIs sans shell forment la défense de base.",
    ],
    scenario: `<p>App d'entraînement générée : recherche <code>GET /search?q=</code> construit <code>SELECT * FROM items WHERE name LIKE '%\${q}%'</code>. Une autre route API lance <code>exec(\`ping \${host}\`)</code> pour un contrôle de santé. L'IA affirme que « l'entrée vient de l'interface donc c'est sûr ».</p>`,
    findings: [
      {
        id: "f1",
        label: "La concaténation SQL avec l'entrée utilisateur est une injection SQL exploitable",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Les requêtes paramétrées (ou ORM sûr) sont le correctif de base",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Passer host utilisateur à un shell (exec) ouvre une injection de commande",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label: "La validation / liste d'autorisation serveur reste nécessaire même avec une interface « gentille »",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "« Ça vient de l'interface » suffit comme contrôle d'entrée",
        correct: false,
      },
      {
        id: "f6",
        label: "Échapper uniquement les apostrophes à la main remplace les paramètres liés",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Preuve : charge utile SQL ou commande sur les routes API. Correctif : paramètres liés, APIs sans shell, validation aux frontières. L'interface n'est pas une frontière de confiance.</p>`,
  },

  m02_2: {
    id: "svc-audit-securite-ex-m02-2",
    format: "audit",
    title: "Auditer un composant XSS",
    instructions:
      "Audite le composant React. Coche les constats justes sur XSS et envois de fichiers liés.",
    hints: [
      "dangerouslySetInnerHTML + contenu utilisateur = XSS.",
      "Sanitize, sinon n'injecte pas de HTML brut.",
    ],
    scenario: `<p>Composant <code>CommentBody</code> : <code>dangerouslySetInnerHTML={{ __html: comment.html }}</code> sans sanitizer. Les commentaires viennent de l'API. Un envoi d'avatar accepte n'importe quelle extension d'après le <code>Content-Type</code> client et sert les fichiers depuis le même origin exécutable.</p>`,
    findings: [
      {
        id: "f1",
        label: "HTML utilisateur non sanitisé via dangerouslySetInnerHTML = XSS",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Il faut sanitizer (ou éviter innerHTML) avant de rendre du HTML tiers",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Se fier au Content-Type client pour un envoi de fichier est insuffisant",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Servir des fichiers envoyés exécutables depuis l'app augmente le risque",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "dangerouslySetInnerHTML est toujours sûr en React 18+",
        correct: false,
      },
      {
        id: "f6",
        label: "Le nom de fichier choisi par l'utilisateur peut être utilisé tel quel en stockage",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Sanitize ou texte échappé : n'injecte pas de HTML brut non fiable. Envois de fichiers : type réel, taille, noms aléatoires, stockage non exécutable.</p>`,
  },

  m03_1: {
    id: "svc-audit-securite-ex-m03-1",
    format: "audit",
    title: "Audit d'accès de l'app en cours",
    instructions:
      "Coche les constats justes pour une matrice route × rôle sur le capstone.",
    hints: [
      "IDOR = id dans l'URL alors qu'il n'y a pas de contrôle de propriété.",
      "Webhook et RLS font partie de la surface.",
    ],
    scenario: `<p>Produit capstone : <code>GET /api/invoices/:id</code> renvoie toute facture si on est « connecté ». <code>/api/admin/users</code> n'a qu'un <code>if (!user)</code> sans rôle. Le webhook paiement est sans vérification de signature. RLS « activé » mais policy <code>USING (true)</code> pour anon sur une table sensible.</p>`,
    findings: [
      {
        id: "f1",
        label: "GET invoice par id sans propriété : IDOR à corriger",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Les routes admin doivent vérifier le rôle, et pas seulement la session",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Les webhooks doivent vérifier la signature du fournisseur",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label: "RLS avec policy trop permissive ne protège pas les lignes",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f5",
        label: "Une matrice route × rôle avec verdict et correctif est le livrable d'audit",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f6",
        label: "Cacher le lien Admin dans le menu React suffit comme AuthZ",
        correct: false,
      },
      {
        id: "f7",
        label: "« RLS on » sans lire les policies signifie que la surface est déjà OK",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Matrice : chaque route + webhook + table RLS. Corrige IDOR (propriété), rôles serveur, signature webhook, policies réelles. En revanche, le masquage UI ne suffit pas.</p>`,
  },

  m04_projet: {
    id: "svc-audit-securite-ex-m04-projet",
    format: "audit",
    title: "Projet P8 : Rapport Security baseline",
    instructions:
      "Avant de clôturer P8, coche ce qui doit être vrai dans le rapport Security baseline du capstone.",
    hints: [
      "Liste de contrôle complète : secrets, injections, AuthZ, deps.",
      "Chaque constat = preuve + correctif ; zéro critique ouverte.",
    ],
    scenario: `<p>Objectif P8 : rapport Security baseline sur le produit capstone, avec preuves, correctifs et points restants. Un agent a « livré » : secrets encore dans l'historique non tournés, une route IDOR « à fixer plus tard », <code>dangerouslySetInnerHTML</code> sur les bios, package.json avec deps inventées et <code>"*"</code>, <code>npm audit</code> rouge ignoré en CI.</p>`,
    findings: [
      {
        id: "f1",
        label: "La liste de contrôle security-baseline doit être entièrement passée (ou écarts documentés non critiques)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Chaque constat du rapport a une preuve et un correctif appliqué ou planifié",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Aucune faille critique ouverte (secrets live, IDOR, injection, XSS trivial)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label: "package.json assaini : aucune deps hallucinée, pins / lock, audit triagé",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Secrets : aucun en dur, ignores OK, rotation si exposition historique",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f6",
        label: "Laisser les critiques « pour après le lancement » est acceptable dans le baseline",
        correct: false,
      },
      {
        id: "f7",
        label: "Ignorer npm audit rouge et les deps inventées n'impacte pas le rapport",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>Rapport P8 : liste de contrôle complète, preuves + correctifs, zéro critique ouverte, chaîne d'approvisionnement logicielle assainie. « On verra après le lancement » = non.</p>`,
  },
};
