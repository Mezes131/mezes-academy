# Templates email Auth Supabase (Mezes Academy)

Coller chaque fichier dans **Authentication → Email Templates** (onglet correspondant).

**Logo :** `https://academy.mezescorp.com/assets/favicon-BOPP1AfS.png`

| Fichier | Onglet Supabase | Subject suggéré (FR) |
|---------|-----------------|----------------------|
| `confirm-signup.html` | Confirm sign up | Confirme ton email — Mezes Academy |
| `invite-user.html` | Invite user | Tu es invité·e sur Mezes Academy |
| `magic-link.html` | Magic Link | Ton lien de connexion — Mezes Academy |
| `change-email.html` | Change Email Address | Confirme ton nouvel email — Mezes Academy |
| `reset-password.html` | Reset Password | Réinitialise ton mot de passe — Mezes Academy |
| `reauthentication.html` | Reauthentication | Code de vérification — Mezes Academy |

Variables Go `{{ .ConfirmationURL }}`, `{{ .Token }}`, etc. : **ne pas renommer**.

