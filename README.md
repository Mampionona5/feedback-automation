# Feedback Automation App

Mini-application d'automatisation pour collecter les avis clients via Tally et les intégrer automatiquement dans Notion avec envoi de mail de remerciement.

## 📋 Objectif

Automatiser le flux complet :
1. **Collecte** : Formulaire de satisfaction Tally
2. **Stockage** : Base de données clients Notion
3. **Notification** : Email de remerciement automatique

## 🎯 Scope

- ✅ Solution **ponctuelle**, non-scalable
- ✅ Utilisable depuis partout (cloud)
- ✅ Déploiement sur **Vercel**
- ✅ Webhook Tally → API Vercel → Notion + Email

## 🛠️ Stack Technologique

| Composant | Technologie |
|-----------|------------|
| **Serveur** | Node.js (Next.js API Routes) |
| **Hébergement** | Vercel |
| **Base de données** | Notion API |
| **Service Email** | Resend (ou SendGrid/SMTP) |
| **Webhook** | Tally webhook natif |
| **Versioning** | Git + Vercel |

## 📝 Architecture Globale

```
Tally Form → Webhook Post → Vercel API Endpoint
                              ├─→ Save to Notion DB
                              └─→ Send Thank You Email
```

## 📋 Plan d'Action

### Phase 1 : Préparation (20-30 min)
- [ ] Créer/récupérer formulaire Tally
- [ ] Créer base Notion (table Clients + Avis)
- [ ] Générer API keys (Notion, Email service)
- [ ] Valider l'accès à Vercel

### Phase 2 : Développement (1-2 heures)
- [ ] Initialiser projet Next.js sur Vercel
- [ ] Implémenter endpoint webhook `/api/webhook`
- [ ] Intégrer Notion API
- [ ] Intégrer service email
- [ ] Validation & gestion d'erreurs

### Phase 3 : Intégration (5-10 min)
- [ ] Configurer webhook Tally → URL Vercel
- [ ] Tests avec données de test

### Phase 4 : Déploiement & Sécurité (15-30 min)
- [ ] Déployer sur Vercel
- [ ] Tests flux complet
- [ ] Sécurisation du webhook (signature Tally)

## 🚀 Mise en Place

### Configuration Requise
```
Variables d'environnement (.env.local):
- NOTION_API_KEY
- NOTION_DATABASE_ID
- NOTION_CLIENTS_DATABASE_ID
- EMAIL_SERVICE_KEY (Resend, SendGrid, etc.)
- TALLY_WEBHOOK_SECRET (optionnel)
```

### Démarrage Local
```bash
npm install
npm run dev
# Accédible sur http://localhost:3000
```

### Déploiement Vercel
```bash
vercel deploy
# Récupérer l'URL de production
# Configurer le webhook Tally vers cette URL
```

## 📁 Structure du Projet

```
feedback-automation-app/
├── public/          # Assets statiques
├── pages/
│   └── api/
│       └── webhook.js    # Endpoint Tally
├── lib/
│   ├── notion.js         # Intégration Notion
│   └── email.js          # Service email
├── .env.local            # Variables d'environnement
├── package.json
└── README.md             # Ce fichier
```

## 🔗 Ressources

- [Tally Webhooks Docs](https://tally.so/help/webhooks)
- [Notion API Docs](https://developers.notion.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Resend Email API](https://resend.com/)

## 📝 Prochaines Étapes

1. Valider les credentials et accès
2. Créer la structure du projet
3. Développer l'API webhook
4. Tester et déployer

---

**Status** : 🚀 En préparation
