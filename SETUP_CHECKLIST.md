# 📋 Setup Checklist - Phase 1

Complète cette checklist et fournit les informations ci-dessous pour passer à la Phase 2.

---

## 1️⃣ Formulaire Tally

- [ ] Formulaire créé/récupéré
- [ ] Champs configurés (Nom, Email, Note, Commentaire)

**URL du formulaire Tally :**
```
https://tally.so/r/44o9Db```

---

## 2️⃣ Base Notion

- [x] Table "Clients" créée
- [x] Table "Avis/Feedbacks" créée
- [x] Colonnes configurées selon le modèle

**ID de la table Clients :**
```
33fedd65-2b77-8018-bb30-000b72909dc2
```

**ID de la table Avis/Feedbacks :**
```
33fedd65-2b77-8108-abb9-000bec6b86a0
```

**Tip pour trouver les IDs :** L'URL Notion ressemble à `notion.so/workspace/[ID]?v=[VERSION_ID]`

---

## 3️⃣ Notion API

- [ ] Intégration créée sur [notion.so/my-integrations](https://www.notion.so/my-integrations)
- [ ] Token d'API copié
- [ ] Tables partagées avec l'intégration

**Notion API Key :**
```
secret_[DANS .env.local]
```

---

## 4️⃣ Service Email (Choisir une option)

### Option retenue : ☐ Resend  |  ☐ SendGrid  |  ☐ SMTP Perso

- [ ] Compte créé
- [ ] API Key générée
- [ ] Domaine configuré (si applicable)

**API Key Email :**
```
re_[DANS .env.local]
```

**Service utilisé :**
```
Resend ✅
```

---

## 5️⃣ Vercel

- [ ] Compte Vercel créé
- [ ] GitHub/GitLab connecté
- [ ] Accès validé

```
✅ Prêt à déployer sur Vercel
```

---

## 📝 Fichier d'Environnement

Crée un fichier `.env.local` à la racine du projet avec :

```bash
# Notion
NOTION_API_KEY=secret_[TON_TOKEN]
NOTION_CLIENTS_DATABASE_ID=
NOTION_FEEDBACK_DATABASE_ID=

# Email
RESEND_API_KEY=re_[TA_CLE]
# OU
# SENDGRID_API_KEY=SG.[TA_CLE]

# Tally (optionnel pour plus tard)
TALLY_WEBHOOK_SECRET=
```

---

## ✅ Récapitulatif à Me Fournir

Quand tu auras complété tout, fournis-moi ce résumé :

```
✅ Tally Form URL : https://tally.so/r/[ID]

✅ Notion Clients DB ID : 

✅ Notion Feedback DB ID : 

✅ Notion API Key : secret_xxxxx

✅ Service Email : [Resend / SendGrid / SMTP]

✅ Email API Key : [Ta clé]

✅ Vercel Ready : ✓
```

---

**Une fois prêt → On lance la Phase 2 ! 🚀**
