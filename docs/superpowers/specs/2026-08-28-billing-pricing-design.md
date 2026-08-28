# Spec — Modèle économique, billing & page Pricing

**Projet** : Mezes Academy (`react-learn`)  
**Date** : 2026-08-28  
**Statut** : Approuvé en brainstorming — en attente de relecture utilisateur  
**Auteur** : Design session (brainstorming)

---

## 1. Contexte & objectif

Mezes Academy est une plateforme d'apprentissage (React + Secure Vibe Coding) avec auth Supabase, progression, exercices Sandpack et quiz. Chaque leçon du parcours VibeCoding inclura une **vidéo** ; l'accès aux vidéos nécessite un compte **Premium** ou **Enterprise**.

**Objectif** : intégrer un système d'abonnement récurrent avec :

- Page `/pricing` (packages Free · Premium · Enterprise)
- Checkout dynamique (méthode de paiement selon pays/devise)
- Paiements via **Payoneer** (carte/banque) et **KPay** (mobile money Afrique)
- Paywall sur les blocs `video` uniquement (texte, exercices, quiz restent gratuits)

**Contrainte PSP** : ni Payoneer Checkout ni KPay offrent une API d'abonnement récurrent natif. Le **moteur d'abonnement est internalisé** dans Supabase ; les PSP collectent des paiements ponctuels à chaque cycle (souscription initiale, renouvellement, trial J+7).

---

## 2. Modèle économique

### 2.1 Tiers

| Tier | Cible | Prix (référence EUR) | Accès vidéos | Catalogue |
|------|-------|------------------------|--------------|-----------|
| **Free** (`student`) | Tous | 0 € | ❌ | — |
| **Premium** | Individuel (1 compte) | 20 €/mois · 150 €/an | ✅ | Tous parcours actifs (SVC + React) |
| **Enterprise** | Équipe (N sièges) | 20 €/siège/mois | ✅ | Tous parcours actifs |

### 2.2 Contenu gratuit vs payant

| Contenu | Free | Premium / Enterprise |
|---------|------|---------------------|
| Texte des leçons | ✅ | ✅ |
| Exercices Sandpack | ✅ | ✅ |
| Quiz & progression | ✅ | ✅ |
| Syllabus & navigation | ✅ | ✅ |
| **Vidéos** (`ContentBlock` kind `video`) | ❌ | ✅ |

Login requis pour tout contenu (comportement actuel conservé).

### 2.3 Trial Premium

- **7 jours gratuits** sur le premier abonnement Premium
- Accès vidéos immédiat pendant le trial
- Facturation automatique à J+7 si non annulé
- **1 trial par compte** (`profiles.trial_used = true` après utilisation)
- Annulation pendant le trial → accès vidéo coupé immédiatement

### 2.4 Enterprise

| Segment | Flux | Prix |
|---------|------|------|
| Petite équipe (2–9 sièges) | Self-service checkout | 20 €/siège/mois |
| Grande équipe (≥ 10 sièges) | Formulaire contact → devis manuel → activation admin | Sur devis |

Fonctions Enterprise :

- Facturation centralisée (1 paiement pour N sièges)
- Admin org : invite membres, gère sièges
- Chaque membre invité obtient entitlement `video_access` via `organization_members`

### 2.5 Multi-devises

- **Prix de référence** : EUR (20 €/mois, 150 €/an, 20 €/siège/mois)
- **Affichage** : devise locale selon pays détecté (profil → préférence → géoloc IP fallback)
- **Conversion** : table de taux interne (`exchange_rates`), mise à jour périodique (cron ou import manuel v1)
- **Checkout** : montant facturé dans la devise du PSP (XOF, XAF, KES, RWF, EUR, USD…)

---

## 3. Passerelles de paiement

### 3.1 Payoneer Checkout — carte / banque

- **Usage** : paiements internationaux par carte (Visa, Mastercard)
- **Intégration** : widget `@payoneer/op-payment-widget-v3` (embedded ou hosted page) + Edge Function backend (`POST /lists` session)
- **Devises natives** : EUR, USD ; autres devises converties par Payoneer (~1,5 %)
- **Disponibilité** : tous pays (fallback quand KPay indisponible)

### 3.2 KPay — mobile money Afrique

- **Base URL** : `https://pay.esicia.com/`
- **Auth** : headers `Kpay-Key` + `Authorization: Basic`
- **Méthodes** : `momo` (MTN, Airtel, Orange, Moov…), `cc` (cartes), `spenn`
- **Webhook** : `returl` (callback asynchrone, source de vérité)
- **Pas d'abonnement natif** : chaque cycle = appel API `action: pay` + webhook confirmation

### 3.3 Matrice pays KPay

Config centralisée (`country_payment_methods`). Ajout d'un pays sans redéploiement frontend.

| Code ISO | Pays | Opérateurs MoMo | Devise(s) |
|----------|------|-----------------|-----------|
| `BEN` | Bénin | MTN · Moov | XOF |
| `CMR` | Cameroun | MTN · Orange | XAF |
| `CIV` | Côte d'Ivoire | MTN · Orange | XOF |
| `COD` | RD Congo | Vodacom M-Pesa · Airtel · Orange | CDF · USD |
| `GAB` | Gabon | Airtel | XAF |
| `KEN` | Kenya | M-Pesa | KES |
| `COG` | Congo | Airtel | XAF |
| `RWA` | Rwanda | Airtel · MTN | RWF |
| `SEN` | Sénégal | Free · Orange | XOF |
| `SLE` | Sierra Leone | Orange | SLE |
| `UGA` | Ouganda | Airtel · MTN | UGX |
| `ZMB` | Zambie | Airtel · MTN · Zamtel | ZMW |

**Hors ces 12 pays** : Payoneer uniquement.

---

## 4. Architecture

### 4.1 Diagramme

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  React SPA  │────▶│ Supabase Edge    │────▶│ Payoneer API    │
│  /pricing   │     │ Functions        │     │ (carte/banque)  │
│  /checkout  │     │ (billing core)   │     └─────────────────┘
│  ModuleView │     │                  │     ┌─────────────────┐
│  (paywall)  │     │  webhooks ◀──────│────▶│ KPay API        │
└─────────────┘     │  cron renewals   │     │ (mobile money)  │
                    └────────┬─────────┘     └─────────────────┘
                             │
                    ┌────────▼─────────┐
                    │ Supabase Postgres  │
                    │ subscriptions      │
                    │ payments           │
                    │ entitlements       │
                    │ organizations      │
                    └────────────────────┘
```

### 4.2 Principes

1. **Supabase = source de vérité** pour statut abonnement et entitlements
2. **PSP = collecte ponctuelle** ; webhooks confirment ou rejettent
3. **Aucune donnée carte stockée** — PCI délégué aux PSP
4. **Config pays/méthodes en base** — pas de hardcode frontend

### 4.3 Stack existante réutilisée

| Composant existant | Usage billing |
|--------------------|---------------|
| `useAuth` / `profiles` | Extension `country`, `preferred_currency`, `trial_used` |
| `RequireAuth` | Conservé ; nouveau guard `RequireVideoAccess` ou check entitlement |
| `ModuleView` bloc `video` | Paywall si pas d'entitlement |
| `analytics.ts` | Nouveaux événements billing |
| `i18n` FR/EN | Strings pricing, checkout, paywall |
| Edge Functions Supabase | Webhooks, init paiement, cron renewals |

---

## 5. Modèle de données

### 5.1 Nouvelles tables

#### `plans`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | text PK | `premium_monthly`, `premium_annual`, `enterprise_seat_monthly` |
| `name` | text | Nom affiché |
| `price_eur_cents` | integer | Prix référence en centimes EUR |
| `interval` | text | `month` \| `year` |
| `interval_count` | integer | 1 |
| `seat_based` | boolean | true pour Enterprise |
| `active` | boolean | |

#### `subscriptions`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | uuid PK | |
| `user_id` | uuid FK | Souscripteur (Premium individuel) |
| `organization_id` | uuid FK nullable | Pour Enterprise |
| `plan_id` | text FK | |
| `status` | text | `trialing` \| `active` \| `past_due` \| `canceled` |
| `seat_count` | integer | 1 pour Premium ; N pour Enterprise |
| `payment_provider` | text | `payoneer` \| `kpay` |
| `payment_method_type` | text | `card` \| `momo` \| `spenn` |
| `trial_ends_at` | timestamptz nullable | |
| `current_period_start` | timestamptz | |
| `current_period_end` | timestamptz | |
| `canceled_at` | timestamptz nullable | |
| `created_at` | timestamptz | |

Contrainte : `user_id` XOR `organization_id` (un seul non null).

#### `payments`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | uuid PK | |
| `subscription_id` | uuid FK | |
| `provider` | text | `payoneer` \| `kpay` |
| `external_ref` | text | `refid` KPay ou ID Payoneer |
| `amount_cents` | integer | Montant facturé |
| `currency` | text | Devise facturée |
| `status` | text | `pending` \| `succeeded` \| `failed` \| `cancelled` |
| `provider_payload` | jsonb | Réponse brute webhook |
| `paid_at` | timestamptz nullable | |
| `created_at` | timestamptz | |

#### `entitlements`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | uuid PK | |
| `user_id` | uuid FK | |
| `feature` | text | `video_access` (v1) |
| `source` | text | `subscription` \| `organization` \| `trial` |
| `source_id` | uuid | ID subscription ou org |
| `expires_at` | timestamptz nullable | null = pas d'expiration liée à période |
| `created_at` | timestamptz | |

Index : `(user_id, feature)` pour lookup rapide paywall.

#### `organizations`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | uuid PK | |
| `name` | text | |
| `owner_id` | uuid FK profiles | |
| `seat_limit` | integer | |
| `billing_email` | text | |
| `status` | text | `active` \| `suspended` |
| `created_at` | timestamptz | |

#### `organization_members`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | uuid PK | |
| `organization_id` | uuid FK | |
| `user_id` | uuid FK | |
| `role` | text | `admin` \| `member` |
| `invited_at` | timestamptz | |
| `accepted_at` | timestamptz nullable | |

#### `country_payment_methods`

| Colonne | Type | Description |
|---------|------|-------------|
| `country_code` | text PK | ISO 3166-1 alpha-3 |
| `kpay_enabled` | boolean | |
| `operators` | jsonb | Liste opérateurs MoMo |
| `currencies` | text[] | Devises supportées |
| `payoneer_enabled` | boolean | Toujours true v1 |

#### `exchange_rates`

| Colonne | Type | Description |
|---------|------|-------------|
| `currency` | text PK | |
| `rate_from_eur` | numeric | 1 EUR = X unités |
| `updated_at` | timestamptz | |

### 5.2 Extension `profiles`

| Colonne | Type | Description |
|---------|------|-------------|
| `country` | text nullable | ISO alpha-3 |
| `preferred_currency` | text nullable | |
| `trial_used` | boolean default false | |

### 5.3 RLS

- `subscriptions` : user lit ses propres ; org admin lit org
- `payments` : idem
- `entitlements` : user lit ses propres
- `organizations` / `organization_members` : membres de l'org
- `country_payment_methods`, `exchange_rates`, `plans` : lecture publique
- Écriture billing : **Edge Functions avec service role** uniquement

---

## 6. Checkout — formulaire dynamique

**Route** : `/checkout?plan=premium_monthly` (ou `premium_annual`, `enterprise`)

### 6.1 Flux UI

1. **Détection locale** : `profiles.country` → `preferred_currency` → géoloc IP (Edge Function ou service tiers)
2. **Affichage prix** : conversion EUR → devise locale via `exchange_rates`
3. **Select « Moyen de paiement »** — options filtrées :

```
Pays dans liste KPay (12 pays)
  ├─ Mobile Money (KPay) — opérateurs du pays
  ├─ Carte via KPay (cc) — si dispo
  └─ Carte / banque (Payoneer) — fallback international

Pays hors liste KPay
  └─ Carte / banque (Payoneer) uniquement
```

4. **Sous-select opérateur** : visible si MoMo choisi → MTN / Orange / Moov / etc.
5. **Champs conditionnels** :
   - MoMo : `msisdn` (numéro avec indicatif pays, sans `+`)
   - Payoneer : widget embedded ou redirection hosted page
6. **Trial** : badge « 7 jours gratuits » si `trial_used = false`
7. **Consentement** : checkbox CGU + politique de remboursement

### 6.2 Logique backend `create-subscription`

```
POST /functions/v1/create-subscription
Body: { plan_id, payment_provider, payment_method_type, operator?, msisdn? }

1. Valider plan actif
2. Vérifier pas d'abonnement actif existant
3. Créer subscription (trialing si trial eligible, sinon pending)
4. Si trialing → créer entitlement video_access (expires trial_ends_at)
5. Si pas trialing → appeler initiate-payment
6. Retourner { subscription_id, checkout_url?, widget_config? }
```

### 6.3 Logique `initiate-payment`

```
1. Calculer montant : plan.price × seat_count, converti en devise PSP
2. Créer payment (status: pending)
3. KPay → POST pay.esicia.com avec refid = payment.id
4. Payoneer → POST /lists session, retourner widget config
5. Retourner config frontend
```

---

## 7. Webhooks

### 7.1 KPay (`POST /functions/v1/webhook-kpay`)

- Valider signature / credentials selon doc KPay
- Matcher `refid` → `payments.id`
- `succeeded` → payment.status = succeeded, prolonger subscription, refresh entitlement
- `failed` / `cancelled` → payment.status = failed/cancelled, subscription past_due ou suppress trial

### 7.2 Payoneer (`POST /functions/v1/webhook-payoneer`)

- Valider HMAC signature
- Matcher external_ref → payment
- Idem logique statut

### 7.3 Polling fallback

Job toutes les 15 min : payments `pending` > 30 min → appel statut KPay (`action: check`) / Payoneer status API

---

## 8. Renouvellements & dunning

### 8.1 Cron quotidien (`renew-subscriptions`)

```
SELECT subscriptions WHERE current_period_end <= now() AND status IN (active, past_due)

Pour chaque :
  1. initiate-payment (montant renouvellement)
  2. Si trial_ends_at passé et premier paiement → transition trialing → active
```

### 8.2 Dunning

| Jour | Action |
|------|--------|
| J+0 échec | status → `past_due`, email échec, notification in-app |
| J+1 | Relance paiement auto + email |
| J+3 | Relance |
| J+7 | status → `canceled`, entitlement révoqué, email fin accès |

Pendant `past_due` : accès vidéo maintenu (grace period) jusqu'à J+7.

### 8.3 Annulation

- User annule via `/account/billing` → `canceled_at` set, accès jusqu'à `current_period_end`
- Trial annulé → accès coupé immédiatement

---

## 9. Paywall vidéo

### 9.1 Composant `VideoPaywall`

Emplacement : `ModuleView.tsx`, case `video`.

**Si entitlement `video_access` actif** (expires_at > now ou null avec active sub) → player normal.

**Sinon** → paywall :
- Poster vidéo (si `posterUrl`) ou placeholder
- Message : « Cette vidéo est réservée aux membres Premium »
- CTA primaire : « Essayer 7 jours gratuits » (si trial disponible) ou « S'abonner »
- CTA secondaire : lien `/pricing`
- Analytics : `video_paywall_view`, `video_paywall_cta_click`

### 9.2 Hook `useEntitlement(feature)`

```ts
// Retourne { hasAccess, loading, expiresAt, source }
// Source : entitlements table + cache React Query
```

### 9.3 Sécurité contenu

v1 : paywall UI (vidéo non chargée côté client si pas d'accès).  
v2 (optionnel) : URLs vidéo signées via Edge Function si hébergement propriétaire (Mux/Bunny).

---

## 10. Page `/pricing`

### 10.1 Layout

3 cartes côte à côte (responsive stack mobile) :

| Carte | Contenu |
|-------|---------|
| **Free** | 0 € · texte, exercices, quiz · CTA « Créer un compte » |
| **Premium** | Badge « Populaire » · toggle mensuel/annuel · 20 €/mois ou 150 €/an (converti) · trial 7j · CTA checkout |
| **Enterprise** | 20 €/siège/mois · sièges 2–9 self-service · CTA checkout ou « Demander un devis » si ≥10 |

### 10.2 Fonctionnalités

- Toggle mensuel / annuel avec animation
- Prix converti selon locale utilisateur
- Tableau comparatif features (vidéos, parcours, support)
- FAQ pricing (trial, annulation, devises, MoMo)
- Liens depuis paywall, header, footer

### 10.3 Routes

| Route | Page |
|-------|------|
| `/pricing` | PricingPage |
| `/checkout` | CheckoutPage |
| `/account/billing` | BillingPage (sous AccountPage) |
| `/account/team` | TeamPage (Enterprise, phase 5) |

---

## 11. Account billing (`/account/billing`)

- Plan actuel, statut, date renouvellement
- Méthode de paiement enregistrée (provider + type)
- Changer plan (mensuel ↔ annuel) — prise effet fin de période
- Historique paiements (table `payments`)
- Télécharger reçu PDF
- Annuler abonnement
- Enterprise : lien vers `/account/team`

---

## 12. Enterprise — flux détaillés

### 12.1 Self-service (< 10 sièges)

1. Checkout `plan=enterprise_seat_monthly&seats=N`
2. Création `organization` + `subscription` liée
3. Owner = admin, invite membres par email
4. Invitation → email avec lien accept → `organization_members.accepted_at`
5. Chaque membre accepté → entitlement `video_access` source `organization`

### 12.2 Devis (≥ 10 sièges)

1. Formulaire `/pricing` : nom entreprise, email, N sièges, message
2. Notification interne (email admin GTA)
3. Activation manuelle : admin SQL ou future UI admin → org + subscription custom
4. Pas de checkout automatique v1

### 12.3 Gestion sièges

- Ajout siège → proration ou facturation au prochain cycle (v1 : prochain cycle)
- Suppression membre → entitlement révoqué, siège libéré
- `seat_limit` enforced à l'invitation

---

## 13. Emails transactionnels

| Événement | Template |
|-----------|----------|
| Trial démarré | Bienvenue + date fin trial |
| Paiement réussi | Reçu + période |
| Échec paiement | Relance + lien billing |
| Renouvellement J-3 | Rappel |
| Abonnement annulé | Confirmation + date fin accès |
| Invitation Enterprise | Lien accept |

Utiliser Supabase Auth email ou service externe (Resend, etc.) — à confirmer en implémentation.

---

## 14. Analytics

Événements GA via `analytics.ts` :

| Événement | Trigger |
|-----------|---------|
| `pricing_view` | Page `/pricing` |
| `checkout_start` | Arrivée checkout |
| `payment_method_selected` | Changement select |
| `trial_started` | Subscription trialing créée |
| `subscription_activated` | Premier paiement réussi |
| `payment_failed` | Webhook failed |
| `subscription_canceled` | Annulation user |
| `video_paywall_view` | Paywall affiché |
| `video_paywall_cta_click` | CTA paywall cliqué |

---

## 15. Conformité & légal

- **CGU** : mise à jour section offre payante, trial, remboursement, résiliation
- **Facturation** : reçu PDF généré après `payment.succeeded` (numéro séquentiel, montant, devise, TVA si applicable)
- **TVA** : hors scope v1 — mention « prix selon localisation » ; revue comptable avant go-live international
- **PCI** : aucune carte stockée — Payoneer/KPay widgets
- **Consentement checkout** : checkbox CGU obligatoire

---

## 16. Variables d'environnement

```env
# Payoneer
PAYONEER_CLIENT_ID=
PAYONEER_CLIENT_SECRET=
PAYONEER_PROGRAM_ID=
PAYONEER_WEBHOOK_SECRET=
PAYONEER_SANDBOX=true

# KPay
KPAY_API_KEY=
KPAY_USERNAME=
KPAY_PASSWORD=
KPAY_RETAILER_ID=
KPAY_SANDBOX=true

# Billing
BILLING_TRIAL_DAYS=7
BILLING_GRACE_PERIOD_DAYS=7
BILLING_ENTERPRISE_SELF_SERVICE_MAX_SEATS=9
```

Frontend (Vite) : uniquement clés publiques / flags sandbox si nécessaire pour widget Payoneer.

---

## 17. Déploiement par phases

| Phase | Scope | Livrables |
|-------|-------|-----------|
| **P1 — Foundation** | Schéma SQL, seed plans + country_payment_methods, hook `useEntitlement`, `VideoPaywall`, `/pricing` statique | Paywall fonctionnel, pricing visible |
| **P2 — Premium + KPay pilote** | Checkout dynamique, KPay webhooks, trial 7j, 3 pays pilotes (RWA, SEN, CIV) | Souscription Premium MoMo Afrique Ouest |
| **P3 — Payoneer + devises** | Payoneer widget, exchange_rates, 12 pays KPay complets | Checkout global |
| **P4 — Renouvellements** | Cron renewals, dunning, emails, `/account/billing` | Abonnement récurrent stable |
| **P5 — Enterprise** | Orgs, sièges, invitations, devis ≥10, `/account/team` | B2B self-service |

**Go-live recommandé** : P1 + P2 avant activation Payoneer global.

---

## 18. Critères de succès

- [ ] Utilisateur Free voit paywall sur vidéos, texte/exercices/quiz accessibles
- [ ] Utilisateur Premium avec trial accède aux vidéos 7 jours sans paiement initial
- [ ] Paiement KPay MoMo (SEN, CIV, RWA) confirme entitlement via webhook
- [ ] Paiement Payoneer carte active entitlement hors zone KPay
- [ ] Renouvellement automatique à `current_period_end`
- [ ] Échec paiement → dunning 7j puis révocation
- [ ] Page pricing affiche prix converti selon pays
- [ ] Checkout select filtre méthodes selon localisation
- [ ] Enterprise 5 sièges : 1 paiement, 5 membres avec accès vidéo
- [ ] Analytics billing trackés dans GA

---

## 19. Hors scope v1

- TVA automatique multi-pays
- Portail PSP externe (tout dans `/account/billing`)
- Vidéos URLs signées (sécurité contenu avancée)
- UI admin interne (activation devis Enterprise = SQL/manuel)
- Remboursements automatiques
- Plans par parcours (tout le catalogue inclus)
- Paiement crypto, virement manuel

---

## 20. Risques & mitigations

| Risque | Mitigation |
|--------|------------|
| KPay/Payoneer sans recurring natif | Billing maison + cron + webhooks ; pattern validé (subscription-kpay) |
| Webhook perdu | Polling fallback 15 min |
| Taux de change stale | Afficher « estimé » + montant exact au checkout |
| MoMo timeout utilisateur | Statut pending + notification « confirmez sur votre téléphone » |
| Payoneer eligibility régionale | Fallback message + support contact |
| Abus trial (multi-comptes) | `trial_used` + même email vérifié |

---

## Annexe A — Mapping KPay `pmethod` / opérateurs

| UI opérateur | KPay `pmethod` | Notes |
|--------------|----------------|-------|
| MTN / Moov / Orange / M-Pesa / etc. | `momo` | Différenciation via msisdn préfixe ou paramètre opérateur selon doc KPay |
| Visa / Mastercard | `cc` | |
| SPENN | `spenn` | |

Vérifier avec credentials sandbox KPay le paramétrage exact opérateur par pays lors de l'implémentation P2.

---

## Annexe B — Fichiers à créer/modifier (référence implémentation)

| Fichier | Action |
|---------|--------|
| `supabase/migrations/xxx_billing.sql` | Créer |
| `supabase/functions/create-subscription/` | Créer |
| `supabase/functions/initiate-payment/` | Créer |
| `supabase/functions/webhook-kpay/` | Créer |
| `supabase/functions/webhook-payoneer/` | Créer |
| `supabase/functions/renew-subscriptions/` | Créer |
| `src/hooks/useEntitlement.ts` | Créer |
| `src/hooks/useBilling.ts` | Créer |
| `src/pages/PricingPage.tsx` | Créer |
| `src/pages/CheckoutPage.tsx` | Créer |
| `src/pages/account/BillingPage.tsx` | Créer |
| `src/components/billing/VideoPaywall.tsx` | Créer |
| `src/components/billing/PricingCards.tsx` | Créer |
| `src/components/learning/ModuleView.tsx` | Modifier (paywall) |
| `src/App.tsx` | Modifier (routes) |
| `src/i18n/messages/fr.ts`, `en.ts` | Modifier |
| `src/lib/analytics.ts` | Modifier |
