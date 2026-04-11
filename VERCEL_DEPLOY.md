# 🚀 Guide Déploiement Vercel - Simple et Rapide

## ✅ Étape 1 : Accéder à Vercel

1. Va sur **https://vercel.com**
2. Clique sur **"Sign In"** (s'inscrire avec GitHub)
3. Autorise Vercel à accéder à ton compte GitHub

---

## ✅ Étape 2 : Importer le Projet

1. Sur le dashboard Vercel, clique **"Add New..."** → **"Project"**
2. Cherche et sélectionne le repo **"feedback-automation"** (de Mampionona5)
3. Clique **"Select"**

---

## ✅ Étape 3 : Configurer les Variables d'Environnement

Une fois le projet importé, dans la page "Configure Project" :

1. **Scroll** jusqu'à la section **"Environment Variables"**
2. Ajoute **4 variables** (les mêmes que dans `.env.local`) :

| Clé | Valeur | Source |
|-----|--------|--------|
| `NOTION_API_KEY` | `ntn_xxxxx...` (depuis `.env.local`) | Ton `.env.local` |
| `NOTION_CLIENTS_DATABASE_ID` | `33fedd65-2b77-8018-bb30-000b72909dc2` | Ton `.env.local` |
| `NOTION_FEEDBACK_DATABASE_ID` | `33fedd65-2b77-8108-abb9-000bec6b86a0` | Ton `.env.local` |
| `RESEND_API_KEY` | `re_xxxxx...` (depuis `.env.local`) | Ton `.env.local` |

**Comment ajouter :**
- Clique le **"+"** dans "Environment Variables"
- Rentre la **clé** (ex: `NOTION_API_KEY`)
- Rentre la **valeur** (ex: `ntn_6...`)
- Clique **"Save"**
- Répète pour les 4 variables

---

## ✅ Étape 4 : Déployer

1. Une fois les variables ajoutées, clique **"Deploy"**
2. Attends (~3-5 min) que Vercel construise et déploie
3. Tu verras un écran "Congratulations" avec une URL du type :
   ```
   https://feedback-automation-xxxxx.vercel.app
   ```

---

## ✅ Étape 5 : Configurer le Webhook Tally

Une fois que tu as l'URL Vercel (ex: `https://feedback-automation-xxxxx.vercel.app`) :

1. Va dans **Tally** → "Settings" du formulaire
2. Cherche **"Webhooks"** ou **"Integrations"**
3. Ajoute un nouveau webhook avec l'URL :
   ```
   https://feedback-automation-xxxxx.vercel.app/api/webhook
   ```
4. Teste le webhook en soumettant une entrée du formulaire

---

## ✅ Vérification Finale

Après avoir configuré le webhook, teste le flux complet :

1. **Soumet le formulaire Tally** avec des données de test
2. **Checks Notion** : une nouvelle entrée doit être créée dans "Clients" et "Avis"
3. **Checks Email** : tu dois recevoir un email de remerciement
4. **Checks les logs Vercel** : Dashboard Vercel → "Logs" pour voir les détails

---

## 🎯 Résumé : 3 Clics Seulement

1. **Import repo GitHub** sur Vercel
2. **Ajoute 4 variables** d'environ (Copy-paste depuis `.env.local`)
3. **Deploy**
4. **Copie l'URL** et configure le webhook Tally

**C'est tout !** 🚀

---

## 🆘 En Cas de Problème

### "Erreur lors du déploiement"
- Vérifies que **toutes les variables** sont présentes
- Vérifie qu'il n'y a pas d'erreur de syntaxe

### "L'API ne fonctionne pas"
- Checks les **Logs** dans Vercel (Dashboard → Logs)
- S'assure que les **IDs Notion et les clés** sont corrects

### "Email n'est pas envoyé"
- Vérifies la clé **Resend** est correcte
- Checks les logs pour voir l'erreur

---

**Une fois que tu as l'URL Vercel, dis-moi ! Je vais vérifier que tout fonctionne et configurer le dernier truc (le webhook Tally).** ✅
