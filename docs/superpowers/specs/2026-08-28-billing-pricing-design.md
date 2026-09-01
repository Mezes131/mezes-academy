# Spec — Modèle économique, billing & page Pricing

**Projet** : Mezes Academy (`react-learn`)  
**Date** : 2026-08-28  
**Statut** : Approuvé en brainstorming — révisé (couche abstraction paiements)  
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

**Contrainte architecture** : les méthodes de paiement et les PSP **ne doivent jamais être codés en dur** dans le frontend ni dans les Edge Functions métier. Toute la disponibilité pays/méthode/provider passe par une **couche d'abstraction config-driven** (voir § 4.4).

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

### 3.3 Matrice pays KPay (données de seed initiales)

Ces données sont **injectées en base** via migration seed — pas de logique hardcodée dans le code applicatif. Ajout/modification d'un pays = mise à jour config admin ou migration, sans redéploiement frontend.

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

**Hors pays KPay** : méthodes Payoneer disponibles via config `country_payment_availability` (fallback international).

---

## 4. Architecture

### 4.1 Diagramme

```
┌─────────────┐     ┌──────────────────────────────────────────┐
│  React SPA  │────▶│ Supabase Edge Functions                  │
│  /pricing   │     │                                          │
│  /checkout  │     │  billing core (agnostique PSP)           │
│  (paywall)  │     │       │                                  │
└─────────────┘     │       ▼                                  │
       ▲            │  PaymentProviderRegistry                 │
       │            │       │                                  │
       │            │   ┌───┴───┐                              │
       │            │   ▼       ▼                              │
       │            │ Payoneer  KPay   … (futurs adapters)     │
       │            │ Adapter   Adapter                        │
       │            └──────┬──────────┬────────────────────────┘
       │                   │          │
       │            ┌──────▼──────────▼──────┐
       └────────────│ GET /payment-methods   │◀── config DB
                    │ (pays → méthodes)      │
                    └──────────┬─────────────┘
                               │
                    ┌──────────▼─────────────┐
                    │ Supabase Postgres        │
                    │ payment_providers        │
                    │ payment_methods          │
                    │ country_payment_avail.   │
                    │ subscriptions · payments │
                    └──────────────────────────┘
```

### 4.2 Principes

1. **Supabase = source de vérité** pour statut abonnement et entitlements
2. **PSP = collecte ponctuelle** ; webhooks confirment ou rejettent
3. **Aucune donnée carte stockée** — PCI délégué aux PSP
4. **Config pays/méthodes en base** — zéro hardcode frontend/backend métier
5. **Abstraction provider** — le billing core ne connaît pas Payoneer/KPay directement ; il parle à des adapters via une interface commune
6. **Extensibilité** — ajouter un PSP = nouvel adapter + entrées config DB, sans modifier checkout/billing/renewals

### 4.3 Stack existante réutilisée

| Composant existant | Usage billing |
|--------------------|---------------|
| `useAuth` / `profiles` | Extension `country`, `preferred_currency`, `trial_used` |
| `RequireAuth` | Conservé ; nouveau guard `RequireVideoAccess` ou check entitlement |
| `ModuleView` bloc `video` | Paywall si pas d'entitlement |
| `analytics.ts` | Nouveaux événements billing |
| `i18n` FR/EN | Strings pricing, checkout, paywall |
| Edge Functions Supabase | Webhooks, init paiement, cron renewals |

### 4.4 Couche d'abstraction paiements

#### 4.4.1 Objectif

Découpler le **billing core** (abonnements, entitlements, renewals) des **implémentations PSP** (Payoneer, KPay, futurs providers). Le checkout et les crons ne contiennent aucune référence directe à un PSP : ils consomment des **méthodes de paiement abstraites** résolues dynamiquement.

#### 4.4.2 Interface `PaymentProviderAdapter` (backend)

Chaque PSP implémente cette interface. Emplacement : `supabase/functions/_shared/payments/`.

```ts
interface PaymentProviderAdapter {
  /** Identifiant stable, correspond à payment_providers.slug */
  readonly slug: string;

  /** Initie un paiement ponctuel et retourne une session checkout */
  initiatePayment(input: InitiatePaymentInput): Promise<PaymentSession>;

  /** Interroge le statut d'un paiement (polling fallback) */
  checkPaymentStatus(externalRef: string): Promise<PaymentStatusResult>;

  /** Parse et valide un webhook entrant ; retourne un événement normalisé */
  handleWebhook(rawBody: string, headers: Headers): Promise<WebhookEvent>;

  /** Indique si ce provider supporte le renouvellement automatique sans interaction user */
  supportsOffSessionRenewal(): boolean;
}
```

**Types normalisés** (agnostiques PSP) :

```ts
interface InitiatePaymentInput {
  paymentId: string;       // UUID interne payments.id
  amountCents: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  description: string;
  methodConfig: Record<string, unknown>; // champs spécifiques (msisdn, operator…)
  returnUrl: string;
  webhookUrl: string;
}

interface PaymentSession {
  type: 'redirect' | 'widget' | 'push';  // redirect URL, widget config, ou push MoMo
  redirectUrl?: string;
  widgetConfig?: Record<string, unknown>;
  externalRef: string;
  userMessage?: string;  // ex. « Confirmez sur votre téléphone »
}

interface WebhookEvent {
  externalRef: string;
  status: 'succeeded' | 'failed' | 'cancelled' | 'pending';
  providerPayload: unknown;
}
```

#### 4.4.3 Registry `PaymentProviderRegistry`

```ts
class PaymentProviderRegistry {
  register(adapter: PaymentProviderAdapter): void;
  get(slug: string): PaymentProviderAdapter;
  getAll(): PaymentProviderAdapter[];
}
```

- Enregistrement des adapters au démarrage de chaque Edge Function
- `initiate-payment` résout l'adapter via `payment_methods.provider_slug`
- `webhook-payment` (endpoint unique) route vers le bon adapter selon le path ou header : `/webhook-payment/:providerSlug`

**Règle** : aucune Edge Function métier (`create-subscription`, `renew-subscriptions`) n'importe `payoneer.ts` ou `kpay.ts` directement.

#### 4.4.4 Adapters v1

| Adapter | Slug | Fichier | Session type |
|---------|------|---------|--------------|
| Payoneer | `payoneer` | `adapters/payoneer.ts` | `widget` ou `redirect` |
| KPay | `kpay` | `adapters/kpay.ts` | `push` (MoMo) ou `redirect` (cc) |

Ajout futur (ex. `flutterwave`) : nouveau fichier adapter + seed DB, zéro changement billing core.

#### 4.4.5 Couche frontend — `PaymentMethodSelector`

Le frontend **ne connaît pas** Payoneer/KPay. Il consomme l'API :

```
GET /functions/v1/payment-methods?country=SEN&currency=XOF
```

Réponse normalisée :

```json
{
  "methods": [
    {
      "id": "uuid",
      "slug": "kpay_momo",
      "type": "mobile_money",
      "label": "Mobile Money",
      "icon": "smartphone",
      "providerSlug": "kpay",
      "currencies": ["XOF"],
      "fields": [
        { "name": "operator", "type": "select", "options": [
          { "value": "orange", "label": "Orange Money" },
          { "value": "free", "label": "Free Money" }
        ]},
        { "name": "msisdn", "type": "tel", "label": "Numéro mobile", "prefix": "+221" }
      ],
      "sortOrder": 1
    },
    {
      "id": "uuid",
      "slug": "payoneer_card",
      "type": "card",
      "label": "Carte bancaire",
      "icon": "credit-card",
      "providerSlug": "payoneer",
      "currencies": ["EUR", "USD"],
      "fields": [],
      "sortOrder": 2
    }
  ]
}
```

Composants frontend :

| Composant | Rôle |
|-----------|------|
| `PaymentMethodSelector` | Rend le select à partir de la réponse API |
| `PaymentMethodFields` | Rend les champs dynamiques (`fields[]`) selon méthode choisie |
| `PaymentSessionRenderer` | Affiche widget Payoneer, redirect, ou message push MoMo selon `session.type` |

**Aucun `if (provider === 'kpay')` dans les pages** — uniquement dans les adapters backend et le renderer de session.

#### 4.4.6 Résolution checkout (flux abstrait)

```
1. Frontend → GET /payment-methods?country=…
2. User sélectionne method.id + remplit fields dynamiques
3. Frontend → POST /create-subscription { plan_id, payment_method_id, fields: {…} }
4. Backend :
   a. Charge payment_methods + payment_providers depuis DB
   b. Valide disponibilité pays/devise via country_payment_availability
   c. Crée subscription + payment (provider_slug depuis DB, pas en dur)
   d. registry.get(provider_slug).initiatePayment(…)
   e. Retourne PaymentSession normalisée
5. Frontend → PaymentSessionRenderer affiche la session
6. Webhook → /webhook-payment/:providerSlug → adapter.handleWebhook → billing core met à jour payment/subscription/entitlement
```

#### 4.4.7 Webhook unifié

Un seul routeur webhook :

```
POST /functions/v1/webhook-payment/:providerSlug
```

Le routeur :
1. Charge l'adapter via registry
2. Appelle `handleWebhook`
3. Délègue à `BillingService.handlePaymentEvent(event)` — logique commune (succès → prolonger sub, échec → past_due)

Pas de duplication de logique billing entre `webhook-kpay` et `webhook-payoneer`.

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
| `payment_method_id` | uuid FK | Référence `payment_methods.id` (méthode choisie au checkout) |
| `payment_provider_slug` | text | Dénormalisé depuis `payment_providers.slug` (audit, renewals) |
| `payment_method_config` | jsonb | Snapshot champs checkout (msisdn, operator…) pour renewals |
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
| `payment_method_id` | uuid FK | Méthode utilisée |
| `provider_slug` | text | Dénormalisé pour requêtes rapides |
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

#### `payment_providers`

Registre des PSP. Chaque provider = 1 adapter backend.

| Colonne | Type | Description |
|---------|------|-------------|
| `slug` | text PK | `payoneer`, `kpay` |
| `name` | text | Nom affiché admin |
| `adapter_module` | text | Nom module adapter (info, pas exécuté depuis DB) |
| `webhook_path` | text | Segment URL webhook : `/webhook-payment/payoneer` |
| `supports_off_session` | boolean | Renouvellement auto sans interaction |
| `sandbox` | boolean | Mode test |
| `active` | boolean | |
| `config` | jsonb | Métadonnées non-secrètes (devises supportées, types session) |

Secrets PSP (API keys) : **variables d'environnement uniquement**, jamais en base.

#### `payment_methods`

Méthodes abstraites exposées au checkout. Une méthode = combinaison provider + type + config UI.

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | uuid PK | |
| `slug` | text UNIQUE | `payoneer_card`, `kpay_momo`, `kpay_cc`, `kpay_spenn` |
| `provider_slug` | text FK | → `payment_providers.slug` |
| `type` | text | `card` \| `mobile_money` \| `bank` \| `wallet` |
| `label_i18n_key` | text | Clé i18n pour label checkout |
| `icon` | text | Identifiant icône Lucide |
| `fields_schema` | jsonb | Schéma champs dynamiques (voir § 4.4.5) |
| `currencies` | text[] | Devises acceptées par cette méthode |
| `sort_order` | integer | Ordre affichage |
| `active` | boolean | |

#### `country_payment_availability`

Lie pays → méthodes disponibles. **Source de vérité** pour le select checkout.

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | uuid PK | |
| `country_code` | text | ISO 3166-1 alpha-3 |
| `payment_method_id` | uuid FK | |
| `enabled` | boolean | |
| `config` | jsonb | Surcharges par pays (ex. `operators`, `default_currency`) |
| `sort_order` | integer | Override ordre par pays |

Index : `(country_code, enabled)` pour lookup `GET /payment-methods`.

**Remplace** l'ancienne table `country_payment_methods` (flags `kpay_enabled` / `payoneer_enabled`).

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
- `country_payment_availability`, `payment_methods`, `payment_providers`, `exchange_rates`, `plans` : lecture publique
- Écriture billing : **Edge Functions avec service role** uniquement

---

## 6. Checkout — formulaire dynamique

**Route** : `/checkout?plan=premium_monthly` (ou `premium_annual`, `enterprise`)

### 6.1 Flux UI (config-driven, sans hardcode PSP)

1. **Détection locale** : `profiles.country` → `preferred_currency` → géoloc IP (Edge Function)
2. **Chargement méthodes** : `GET /payment-methods?country=…&currency=…` → liste depuis `country_payment_availability` + `payment_methods`
3. **Affichage prix** : conversion EUR → devise via `exchange_rates`
4. **`PaymentMethodSelector`** : select alimenté par la réponse API (label, icône, type)
5. **`PaymentMethodFields`** : champs dynamiques selon `fields_schema` de la méthode choisie (opérateur, msisdn, etc.)
6. **`PaymentSessionRenderer`** : après soumission, affiche widget / redirect / message push selon `session.type` — agnostique PSP
7. **Trial** : badge « 7 jours gratuits » si `trial_used = false`
8. **Consentement** : checkbox CGU + politique de remboursement

**Interdit** : `switch(provider)`, listes pays/méthodes en dur dans `.tsx`, imports directs Payoneer/KPay hors adapters et `PaymentSessionRenderer`.

### 6.2 Logique backend `create-subscription`

```
POST /functions/v1/create-subscription
Body: { plan_id, payment_method_id, fields: Record<string, string> }

1. Valider plan actif
2. Charger payment_method + provider depuis DB
3. Vérifier country_payment_availability (pays user, method enabled)
4. Valider fields contre payment_methods.fields_schema
5. Vérifier pas d'abonnement actif existant
6. Créer subscription (trialing si eligible) + snapshot payment_method_config
7. Si trialing → entitlement immédiat
8. Sinon → BillingService.initiatePayment(payment_method_id, fields)
9. Retourner PaymentSession normalisée
```

### 6.3 Logique `BillingService.initiatePayment` (agnostique PSP)

```
1. Charger payment_method → provider_slug
2. Calculer montant converti
3. Créer payment (status: pending)
4. adapter = registry.get(provider_slug)
5. session = adapter.initiatePayment({ paymentId, amount, currency, fields, … })
6. Retourner session au frontend
```

Aucune logique Payoneer/KPay ici — déléguée à l'adapter.

---

## 7. Webhooks

### 7.1 Routeur unifié `webhook-payment`

```
POST /functions/v1/webhook-payment/:providerSlug
```

1. `adapter = registry.get(providerSlug)`
2. `event = adapter.handleWebhook(rawBody, headers)` — validation signature dans l'adapter
3. `BillingService.handlePaymentEvent(event)` — logique commune :
   - `succeeded` → payment OK, prolonger subscription, refresh entitlement
   - `failed` / `cancelled` → past_due ou révocation trial
   - `pending` → no-op (UI affiche attente)

**Pas d'Edge Functions séparées** `webhook-kpay` / `webhook-payoneer` — un routeur + adapters.

### 7.2 Polling fallback

Job toutes les 15 min : payments `pending` > 30 min → pour chaque, `registry.get(provider_slug).checkPaymentStatus(external_ref)` → alimente `BillingService.handlePaymentEvent`.

---

## 8. Renouvellements & dunning

### 8.1 Cron quotidien (`renew-subscriptions`)

```
SELECT subscriptions WHERE current_period_end <= now() AND status IN (active, past_due)

Pour chaque :
  1. BillingService.initiatePayment(subscription.payment_method_id, subscription.payment_method_config)
  2. Adapter résolu via registry — pas d'appel PSP direct
  3. Si trial_ends_at passé et premier paiement → transition trialing → active
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
| **P1 — Foundation** | Schéma SQL (dont `payment_providers`, `payment_methods`, `country_payment_availability`), seed config, abstraction layer (`PaymentProviderRegistry`, interface adapter), `GET /payment-methods`, hook `useEntitlement`, `VideoPaywall`, `/pricing` statique | Paywall + config-driven payment methods API |
| **P2 — Premium + KPay pilote** | Adapter `kpay`, `PaymentMethodSelector` + `PaymentSessionRenderer`, webhook routeur, trial 7j, 3 pays pilotes (RWA, SEN, CIV) | Souscription Premium MoMo via abstraction |
| **P3 — Payoneer + devises** | Adapter `payoneer`, exchange_rates, seed 12 pays KPay complets | Checkout global multi-PSP |
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
- [ ] Checkout select alimenté par `GET /payment-methods` — aucune méthode hardcodée frontend
- [ ] Ajout pays/méthode via seed DB uniquement, sans changement code checkout
- [ ] Webhook routeur unique délègue aux adapters
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
| Hardcode PSP dans checkout | Abstraction `PaymentProviderAdapter` + config DB `payment_methods` |
| Ajout PSP = refactor massif | Registry pattern : nouvel adapter + seed, billing core inchangé |

---

| Abus trial (multi-comptes) | `trial_used` + même email vérifié |

---

## Annexe A — Seed initial `payment_methods` (données, pas code)

| slug | provider | type | fields_schema |
|------|----------|------|---------------|
| `kpay_momo` | `kpay` | `mobile_money` | `operator` (select), `msisdn` (tel) |
| `kpay_cc` | `kpay` | `card` | — |
| `kpay_spenn` | `kpay` | `wallet` | — |
| `payoneer_card` | `payoneer` | `card` | — |

Opérateurs par pays : dans `country_payment_availability.config.operators`, pas dans le code.

---

## Annexe B — Mapping adapter KPay (interne à `adapters/kpay.ts` uniquement)

| UI `operator` | KPay `pmethod` | Notes |
|---------------|----------------|-------|
| MTN / Moov / Orange / M-Pesa / etc. | `momo` | Mapping encapsulé dans l'adapter |
| Visa / Mastercard | `cc` | |
| SPENN | `spenn` | |

Le checkout et le billing core ne connaissent pas ces valeurs — seul l'adapter KPay les traduit.

---

## Annexe C — Fichiers à créer/modifier (référence implémentation)

### Couche abstraction (priorité P1)

| Fichier | Action |
|---------|--------|
| `supabase/functions/_shared/payments/types.ts` | Créer — interfaces normalisées |
| `supabase/functions/_shared/payments/registry.ts` | Créer — `PaymentProviderRegistry` |
| `supabase/functions/_shared/payments/billing-service.ts` | Créer — logique commune (events, renewals) |
| `supabase/functions/_shared/payments/adapters/payoneer.ts` | Créer — adapter Payoneer |
| `supabase/functions/_shared/payments/adapters/kpay.ts` | Créer — adapter KPay |
| `supabase/functions/payment-methods/index.ts` | Créer — `GET` méthodes par pays |
| `supabase/functions/webhook-payment/index.ts` | Créer — routeur webhook unifié |

### Billing & frontend

| Fichier | Action |
|---------|--------|
| `supabase/migrations/xxx_billing.sql` | Créer — inclut `payment_providers`, `payment_methods`, `country_payment_availability` |
| `supabase/seed/billing_payment_methods.sql` | Créer — seed providers, methods, pays KPay |
| `supabase/functions/create-subscription/` | Créer |
| `supabase/functions/renew-subscriptions/` | Créer |
| `src/hooks/useEntitlement.ts` | Créer |
| `src/hooks/usePaymentMethods.ts` | Créer — fetch `GET /payment-methods` |
| `src/hooks/useBilling.ts` | Créer |
| `src/pages/PricingPage.tsx` | Créer |
| `src/pages/CheckoutPage.tsx` | Créer |
| `src/pages/account/BillingPage.tsx` | Créer |
| `src/components/billing/PaymentMethodSelector.tsx` | Créer — select config-driven |
| `src/components/billing/PaymentMethodFields.tsx` | Créer — champs dynamiques `fields_schema` |
| `src/components/billing/PaymentSessionRenderer.tsx` | Créer — widget / redirect / push |
| `src/components/billing/VideoPaywall.tsx` | Créer |
| `src/components/billing/PricingCards.tsx` | Créer |
| `src/components/learning/ModuleView.tsx` | Modifier (paywall) |
| `src/App.tsx` | Modifier (routes) |
| `src/i18n/messages/fr.ts`, `en.ts` | Modifier |
| `src/lib/analytics.ts` | Modifier |

**Supprimé vs spec précédente** : `webhook-kpay/`, `webhook-payoneer/`, `initiate-payment/` (fusionné dans `BillingService` + adapters).
