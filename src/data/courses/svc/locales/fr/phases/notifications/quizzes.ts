import type { Quiz } from "@/types";

export const notificationsQuizzes: Record<"m01" | "m02" | "m03" | "m04", Quiz> =
  {
    m01: {
      id: "svc-notifications-quiz-m01",
      title: "Canaux & moments : valide ta lecture",
      questions: [
        {
          id: "q1",
          question: "Un email transactionnel, c'est surtout…",
          options: [
            {
              id: "a",
              label:
                "Un message lié à une action métier (connexion, paiement, alerte critique) attendu par l'utilisateur",
            },
            { id: "b", label: "Toujours une lettre d'info promotionnelle" },
            {
              id: "c",
              label: "Un push optionnel sans lien avec un événement",
            },
            {
              id: "d",
              label: "Un SMS envoyé sans consentement pour vendre",
            },
          ],
          correct: ["a"],
          explanation:
            "Transactionnel = suite d'un événement produit (réinitialisation, reçu, invitation). Marketing = promo / digest, soumis à d'autres règles de consentement.",
        },
        {
          id: "q2",
          question: "Confondre marketing et transactionnel, c'est risqué parce que…",
          options: [
            {
              id: "a",
              label:
                "Tu peux envoyer du pourriel, casser la chance d'arriver en boîte et violer le consentement / la désinscription",
            },
            { id: "b", label: "Les modèles HTML deviennent plus beaux" },
            {
              id: "c",
              label: "Le prestataire refuse tout email technique",
            },
            {
              id: "d",
              label: "Les files d'attente asynchrones n'existent plus",
            },
          ],
          correct: ["a"],
          explanation:
            "Un email de bienvenue « produit » peut être transactionnel ; une promo hebdomadaire non. Mélange = plaintes, désinscriptions, listes noires.",
        },
        {
          id: "q3",
          question: "Choisir un canal (email, push, SMS), ça dépend surtout…",
          options: [
            {
              id: "a",
              label:
                "Du moment métier, de l'urgence et du consentement disponible",
            },
            {
              id: "b",
              label: "Du logo du prestataire email du tutoriel",
            },
            {
              id: "c",
              label: "D'envoyer sur les trois canaux à chaque événement",
            },
            {
              id: "d",
              label: "De la couleur du bouton « Notifier »",
            },
          ],
          correct: ["a"],
          explanation:
            "Réinitialisation du mot de passe → email (souvent). Urgence mobile → push/SMS si consentement explicite. Pas d'envoi multi-canal par défaut.",
        },
        {
          id: "q4",
          question: "Une matrice événements → canal sert à…",
          options: [
            {
              id: "a",
              label:
                "Décider à l'avance quel canal (et si c'est transactionnel ou marketing) pour chaque événement",
            },
            { id: "b", label: "Remplacer le prestataire email" },
            { id: "c", label: "Éviter les modèles" },
            {
              id: "d",
              label: "Envoyer depuis le navigateur avec la clé secrète",
            },
          ],
          correct: ["a"],
          explanation:
            "Sans matrice, l'IA invente des emails promo sur chaque webhook et oublie les messages critiques.",
        },
        {
          id: "q5",
          question: "Push et SMS dans ce cours sont…",
          options: [
            {
              id: "a",
              label:
                "Des canaux optionnels : utiles si consentement et moment le justifient, pas obligatoires partout",
            },
            {
              id: "b",
              label:
                "Obligatoires pour tout logiciel en ligne (SaaS) dès le jour 1",
            },
            { id: "c", label: "Interdits en transactionnel" },
            { id: "d", label: "Équivalents à logger le PAN" },
          ],
          correct: ["a"],
          explanation:
            "Email reste le socle transactionnel. Push/SMS = bonus avec consentement explicite et coût / abus à gérer.",
        },
      ],
    },

    m02: {
      id: "svc-notifications-quiz-m02",
      title: "Prestataire email : valide ta lecture",
      questions: [
        {
          id: "q1",
          question: "Dans ce cours, Resend / Postmark…",
          options: [
            {
              id: "a",
              label:
                "Sont des exemples du marché : un prestataire email parmi d'autres",
            },
            {
              id: "b",
              label: "Sont les seules marques autorisées en production",
            },
            {
              id: "c",
              label:
                "Doivent être appelés uniquement depuis le navigateur avec la clé secrète",
            },
            { id: "d", label: "Remplacent SPF/DKIM" },
          ],
          correct: ["a"],
          explanation:
            "Reste indépendant : API d'envoi, modèles, domaine, chance d'arriver en boîte existent chez plusieurs prestataires.",
        },
        {
          id: "q2",
          question: "L'API d'envoi (clé secrète) doit…",
          options: [
            {
              id: "a",
              label:
                "Vivre côté serveur / processus de fond, jamais exposée au navigateur",
            },
            {
              id: "b",
              label: "Être collée dans React pour « aller plus vite »",
            },
            {
              id: "c",
              label: "Être commitée dans le dépôt public",
            },
            {
              id: "d",
              label: "Remplacer les préférences utilisateur",
            },
          ],
          correct: ["a"],
          explanation:
            "Clé prestataire = secret. Fuite = pourriel depuis ton domaine / quota brûlé.",
        },
        {
          id: "q3",
          question: "Les modèles d'email transactionnel doivent surtout…",
          options: [
            {
              id: "a",
              label:
                "Être clairs, versionnés, avec variables contrôlées (pas de HTML brut non échappé)",
            },
            {
              id: "b",
              label: "Inclure toujours une grosse promo marketing",
            },
            {
              id: "c",
              label: "Être générés à la volée sans revue",
            },
            {
              id: "d",
              label: "Contenir la clé API en pied de page",
            },
          ],
          correct: ["a"],
          explanation:
            "Bienvenue, reçu, réinitialisation : contenu prévisible, échappement des données utilisateur, lien d'action sûr.",
        },
        {
          id: "q4",
          question: "SPF / DKIM (basique), c'est pour…",
          options: [
            {
              id: "a",
              label:
                "Authentifier ton domaine d'envoi et améliorer la chance d'arriver en boîte de réception",
            },
            {
              id: "b",
              label: "Chiffrer le corps du mail de bout en bout",
            },
            {
              id: "c",
              label: "Remplacer le consentement marketing",
            },
            {
              id: "d",
              label: "Activer Pro sur redirection",
            },
          ],
          correct: ["a"],
          explanation:
            "Sans domaine correctement configuré, même un bon prestataire finit en pourriel.",
        },
        {
          id: "q5",
          question: "La chance d'arriver en boîte de base, ça implique surtout…",
          options: [
            {
              id: "a",
              label:
                "Domaine vérifié, volume raisonnable, contenu attendu, peu de plaintes",
            },
            {
              id: "b",
              label: "Envoyer depuis un domaine aléatoire @gmail.com partagé",
            },
            {
              id: "c",
              label: "Ignorer les emails rejetés et continuer",
            },
            {
              id: "d",
              label: "Mettre la clé secrète dans le modèle",
            },
          ],
          correct: ["a"],
          explanation:
            "Réputation = config DNS + comportement d'envoi. Abus et pourriel tuent la boîte de réception.",
        },
      ],
    },

    m03: {
      id: "svc-notifications-quiz-m03",
      title: "Consentement, préférences, abus : valide ta lecture",
      questions: [
        {
          id: "q1",
          question: "La désinscription doit…",
          options: [
            {
              id: "a",
              label:
                "Être respectée à l'envoi (surtout marketing), pas seulement un lien cosmétique",
            },
            {
              id: "b",
              label: "Être ignorée pour « relancer les inactifs »",
            },
            {
              id: "c",
              label: "S'appliquer uniquement au CSS du pied de page",
            },
            {
              id: "d",
              label:
                "Bloquer aussi les emails de réinitialisation du mot de passe sans alternative",
            },
          ],
          correct: ["a"],
          explanation:
            "Préférences et désinscription sont vérifiés côté serveur avant l'envoi marketing. Le transactionnel critique reste cadré à part.",
        },
        {
          id: "q2",
          question: "Les préférences utilisateur servent à…",
          options: [
            {
              id: "a",
              label:
                "Laisser choisir les catégories (digest, produit, marketing) et les faire respecter à l'envoi",
            },
            { id: "b", label: "Remplacer le prestataire email" },
            {
              id: "c",
              label: "Stocker la clé API dans le profil",
            },
            {
              id: "d",
              label: "Envoyer plus souvent pour « engagement »",
            },
          ],
          correct: ["a"],
          explanation:
            "Interface de préférences sans contrôle à l'envoi = théâtre. Le processus de fond lit les préférences avant d'envoyer.",
        },
        {
          id: "q3",
          question: "Une limite de débit sur l'envoi protège contre…",
          options: [
            {
              id: "a",
              label:
                "Les abus (pourriel, déluge de réinitialisation / invitation) et l'épuisement de quota / réputation",
            },
            { id: "b", label: "Les modèles HTML trop longs" },
            {
              id: "c",
              label: "Les webhooks de paiement signés",
            },
            { id: "d", label: "La configuration SPF" },
          ],
          correct: ["a"],
          explanation:
            "Sans quota, une route « send » ouverte ou un robot brûle ton domaine et ton prestataire.",
        },
        {
          id: "q4",
          question: "Le consentement explicite marketing signifie surtout…",
          options: [
            {
              id: "a",
              label:
                "Consentement explicite avant d'envoyer des messages promo / non essentiels",
            },
            {
              id: "b",
              label: "Cocher toutes les cases par défaut sans le dire",
            },
            {
              id: "c",
              label: "Envoyer dès l'inscription sans mention",
            },
            {
              id: "d",
              label: "Confondre reçu de paiement et lettre d'info",
            },
          ],
          correct: ["a"],
          explanation:
            "Un message transactionnel attendu, ce n'est pas du marketing. Documente la différence et stocke le consentement.",
        },
        {
          id: "q5",
          question: "Côté anti-abus, une bonne pratique est…",
          options: [
            {
              id: "a",
              label:
                "Limiter par utilisateur / IP / type d'email, et journaliser les refus",
            },
            {
              id: "b",
              label: "Laisser n'importe qui POSTer à l'API d'envoi publique",
            },
            {
              id: "c",
              label: "Retirer la désinscription pour « retenir »",
            },
            {
              id: "d",
              label: "Logger le contenu complet des secrets dans Sentry",
            },
          ],
          correct: ["a"],
          explanation:
            "Quotas + auth sur les routes d'envoi + respect des préférences = socle anti-abus.",
        },
      ],
    },

    m04: {
      id: "svc-notifications-quiz-m04",
      title: "Orchestration : valide ta lecture",
      questions: [
        {
          id: "q1",
          question: "Envoyer l'email directement dans la requête HTTP…",
          options: [
            {
              id: "a",
              label:
                "Est fragile : mieux vaut événement → file d'attente / tâche → envoi découplé",
            },
            {
              id: "b",
              label: "Est la seule méthode recommandée en production",
            },
            { id: "c", label: "Garantit l'idempotence" },
            { id: "d", label: "Remplace les préférences" },
          ],
          correct: ["a"],
          explanation:
            "Délais dépassés, nouvelles tentatives et pics cassent la requête synchrone. Une tâche rejouable est plus fiable.",
        },
        {
          id: "q2",
          question: "La chaîne paiement → email de confirmation typique est…",
          options: [
            {
              id: "a",
              label:
                "Webhook signé → effet métier → tâche de notification → prestataire email",
            },
            {
              id: "b",
              label:
                "Redirection seule → email depuis React avec la clé secrète",
            },
            {
              id: "c",
              label: "Ignorer le webhook et envoyer du pourriel marketing",
            },
            {
              id: "d",
              label: "Envoyer avant que le paiement soit confirmé",
            },
          ],
          correct: ["a"],
          explanation:
            "Corrélation paiement/connexion : la notification suit un événement métier fiable, plutôt que la redirection d'expérience.",
        },
        {
          id: "q3",
          question: "Une tâche d'envoi idempotente signifie…",
          options: [
            {
              id: "a",
              label:
                "Rejouer la tâche (même clé / événement) n'envoie pas un doublon indésirable",
            },
            { id: "b", label: "Envoyer deux fois « pour être sûr »" },
            {
              id: "c",
              label: "Désactiver toutes les nouvelles tentatives",
            },
            {
              id: "d",
              label: "Ignorer les préférences à la nouvelle tentative",
            },
          ],
          correct: ["a"],
          explanation:
            "Clé d'idempotence (event_id, notification_id) : un seul envoi réussi effectif.",
        },
        {
          id: "q4",
          question: "Corréler notifications, paiement et connexion sert à…",
          options: [
            {
              id: "a",
              label:
                "S'assurer que bienvenue / réinitialisation / reçu partent sur les vrais événements, pas des fausses implémentations",
            },
            {
              id: "b",
              label: "Mélanger marketing et PAN dans le même log",
            },
            {
              id: "c",
              label: "Appeler le prestataire depuis le navigateur",
            },
            { id: "d", label: "Sauter la file d'attente" },
          ],
          correct: ["a"],
          explanation:
            "Trois emails branchés sur de vrais déclencheurs (connexion + paiement) = critère du projet P7.",
        },
        {
          id: "q5",
          question: "Si le processus de fond échoue après le webhook…",
          options: [
            {
              id: "a",
              label:
                "La nouvelle tentative de la tâche doit pouvoir renvoyer sans double effet métier ni déluge",
            },
            {
              id: "b",
              label: "On active Pro une deuxième fois « au cas où »",
            },
            {
              id: "c",
              label: "On abandonne sans file d'échecs ni alerte",
            },
            {
              id: "d",
              label: "On expose la clé prestataire dans l'erreur client",
            },
          ],
          correct: ["a"],
          explanation:
            "File d'attente + nouvelles tentatives + idempotence + observabilité : l'email rate, le produit reste cohérent.",
        },
      ],
    },
  };
