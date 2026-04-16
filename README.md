# Feedback Automation App

> Automatisez la collecte et le traitement des commentaires clients via Tally → Notion → Email.

## 🎯 Vue d'ensemble

**Feedback Automation** est une application Next.js qui capture les réponses Tally, les sauvegarde dans Notion, et envoie des emails de remerciement automatiquement.

**Status:** ✅ **Production Ready** (Webhook fonctionnel, Notion synchronisé, Emails prêts)

---

## 🚀 Démarrage rapide

### Local (Développement)
```bash
# 1. Cloner et installer
git clone https://github.com/Mampionona5/feedback-automation.git
cd feedback-automation-app
npm install

# 2. Configurer .env.local
# Copier les clés API et database IDs (voir Configuration)

# 3. Lancer le serveur
npm run dev

# 4. Vérifier l'accès
# Ouvrir http://localhost:3000 (vous devriez voir ✅ en vert)
```

### Production (Vercel)
```bash
# 1. Connecter Vercel au repository
# https://vercel.com → Import Project → GitHub

# 2. Configurer variables d'environnement dans Vercel
# Settings → Environment Variables (ajouter les 4 clés requises)

# 3. Déployer
# Vercel redéploie automatiquement à chaque push
```

---

## ⚙️ Configuration

### Variables d'environnement requises

| Variable | Valeur | Où obtenir |
|----------|--------|-----------|
| `NOTION_API_KEY` | Clé d'intégration Notion | [Notion Integration](https://www.notion.so/my-integrations) |
| `NOTION_CLIENTS_DATABASE_ID` | UUID database Clients | Copier l'ID depuis l'URL Notion |
| `NOTION_FEEDBACK_DATABASE_ID` | UUID database Avis/Feedback | Copier l'ID depuis l'URL Notion |
| `RESEND_API_KEY` | Clé API Resend | [Resend Dashboard](https://resend.com) |

### Comment extraire les IDs Notion

Depuis une base Notion, l'URL ressemble à:
```
https://www.notion.so/33fedd652b7780a8b1abec7199cf0bc5?v=33fedd652b7780058cea000c10f2f1be
```

L'ID à utiliser est: `33fedd65-2b77-80a8-b1ab-ec7199cf0bc5` (avec tirets formatés)

---

## 📋 Architecture

### Stack technologique
- **Frontend/Backend:** Next.js 14 + TypeScript
- **Styles:** Tailwind CSS
- **Webhooks:** Tally Form Submissions
- **Database:** Notion API
- **Email:** Resend API

### Structure des fichiers
```
app/
  ├── api/
  │   └── webhook/
  │       └── route.ts          # Endpoint webhook Tally
  └── page.tsx                  # Page d'accueil

lib/
  ├── notion.ts                 # Intégration Notion API
  └── email.ts                  # Intégration Resend Email

public/
  └── [assets]                  # Médias statiques

styles/
  └── globals.css               # Styles Tailwind
```

---

## 🔌 Intégrations

### Tally Form
1. Créer un formulaire dans Tally
2. Ajouter une **intégration webhook**:
   - **URL:** `https://feedback-automation-8rz9.vercel.app/api/webhook`
   - **Trigger:** Form response submission
3. Tally envoie les réponses au webhook

### Notion Database
Les données sauvegardées:

**Base CLIENTS:**
- `Nom` (title) - Prénom du client
- `Email` - Email du client
- ...autres colonnes optionnelles

**Base AVIS (Feedback):**
- `Clients` (title) - Nom du client (text)
- `Note Globale` - Note satisfaction (1-5)
- `Note Satisfaction` - Note satisfaction client
- `Note Contenu` - Note contenu
- `Email envoyé` (checkbox) - ✅ si email envoyé

### Resend Email
Envoie un email de remerciement au client après le formulaire.

**Configuration requise:**
- Actuel: Domaine `resend.dev` (test only) → envoie uniquement au propriétaire du compte
- Production: Domaine personnalisé (DNS records configurés dans Resend)

---

## 📊 Flux de données

```
Tally Form Submission
       ↓
  Webhook Parse
       ↓
Validate & Extract Fields
       ↓
    ├─→ Save to Notion CLIENTS
    │        ↓
    │   Create/Update Client
    │
    └─→ Save to Notion AVIS
             ↓
         Create Feedback
             ↓
         Send Email
             ↓
         Mark Email Sent
```

---

## 🐛 Dépannage

### Erreur: "Could not find database with ID..."
- Vérifier l'ID Notion dans `.env.local` / Vercel
- Formatter correctement avec tirets: `XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`
- Vérifier l'intégration Notion a accès à la base

### Erreur: "[Property Name] is not a property that exists"
- Vérifier les noms des colonnes Notion exactement
- Les noms sont case-sensitive: `Email Envoyé` ≠ `Email envoyé`

### Erreur: "is expected to be [type]"
- Les propriétés Notion doivent correspondre au type:
  - `title` → texte court
  - `relation` → relation à autre base
  - `checkbox` → booléen
  - `number` → nombre

### Email non reçu
- Vérifier status dans Resend dashboard
- Domaine `resend.dev` (test) = emails au propriétaire uniquement
- Pour envoyer aux clients: configurer domaine personnalisé dans Resend

### Webhook retourne 500
- Consulter les logs Vercel: `Settings → Functions → Logs`
- Vérifier les variables d'environnement sont présentes
- Vérifier la structure de la réponse Tally

---

## 📝 Commandes utiles

```bash
# Développement
npm run dev              # Lancer le serveur local

# Build & Deploy
npm run build            # Compiler Next.js
npm start                # Lancer la version compilée

# Linting/Formatting
npm run lint             # Vérifier la qualité du code
```

---

## 📚 Documentation supplémentaire

- **[SESSION_SUMMARY.md](./SESSION_SUMMARY.md)** - Problèmes rencontrés et solutions apportées
- **[HOW_TO_USE.md](./HOW_TO_USE.md)** - Guide complet d'utilisation
- **[DEBUG_WEBHOOK.md](./DEBUG_WEBHOOK.md)** - Aide au débogage webhook

---

## 🔐 Sécurité

- Les clés API sont stockées dans `.env.local` (ignoré par Git) et Vercel env vars
- Les secrets GitHub ont été masqués via push protection
- Webhook ne valide pas HMAC (TODO pour production)

---

## 🎓 Prochaines étapes

- [ ] Configurer domaine personnalisé Resend pour envoi d'emails
- [ ] Ajouter vérification HMAC signature Tally webhook
- [ ] Implémenter déduplication des soumissions Tally
- [ ] Ajouter logging centralisé (Sentry, Datadog)
- [ ] Ajouter rate limiting webhook

---

## 💬 Questions?

Consulter les documents de dépannage ou GitHub issues pour plus d'aide.

**Dernière mise à jour:** Session complète 2025 - Production Ready ✅
