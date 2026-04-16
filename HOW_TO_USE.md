# 🎬 Comment Utiliser le Projet - Guide Étape par Étape

## 🎯 Objectif
Lancer le serveur local et tester le workflow complet : Formulaire → Notion → Email

---

## 📍 ÉTAPE 1 : Ouvrir le Terminal

### Windows - Méthode Simple :
1. **Ouvre l'Explorateur de fichiers**
2. **Va au dossier** : `C:\Users\mampi\Downloads\vs_code\feedback-automation-app`
3. **Appuie sur `Shift + Clic Droit`** dans le dossier
4. Sélectionne **"Ouvrir la fenêtre PowerShell ici"** ou **"Ouvrir une fenêtre de commande ici"**

### Windows - Méthode Alternative :
1. Appuie sur **`Win + R`**
2. Tape : `powershell`
3. Appuie sur **`Entrée`**
4. Tape : `cd C:\Users\mampi\Downloads\vs_code\feedback-automation-app`

### Windows - Méthode VS Code :
1. Ouvre **VS Code**
2. **Fichier → Ouvrir le dossier** → Sélectionne le dossier du projet
3. **Ctrl + `** (backtick) pour ouvrir le terminal intégré

---

## 🚀 ÉTAPE 2 : Démarrer le Serveur

**Dans le terminal, tape :**
```bash
npm run dev
```

**Tu verras quelque chose comme :**
```
> feedback-automation-app@0.1.0 dev
> next dev

  ▲ Next.js 14.0.0

  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 3.5s
```

**Important** : ⏳ La PREMIÈRE FOIS peut prendre 30-60 secondes. C'est normal.

---

## 🌐 ÉTAPE 3 : Accéder à la Page d'Accueil

1. **Ouvre ton navigateur** (Chrome, Firefox, Edge, etc.)
2. **Va à l'URL** : `http://localhost:3000`
3. **Tu dois voir** :
   ```
   ✅ Feedback Automation App
   
   Server is running and ready to receive webhook data from Tally.
   
   POST /api/webhook
   
   Features Enabled
   ✅ Reception des donnees Tally
   ✅ Sauvegarde en base Notion
   ✅ Envoi d'email de remerciement
   ✅ Suivi du statut d'envoi
   ```

**Si tu vois ça, le serveur fonctionne ! ✅**

---

## 🧪 ÉTAPE 4 : Tester l'API (Optionnel mais Recommandé)

### Option A : Avec PowerShell (Recommandé)

1. **Ouvre un NOUVEAU terminal** (ne ferme pas le premier)
2. Va dans le dossier du projet
3. Exécute :
   ```bash
   .\test-webhook.ps1
   ```

4. **Tu verras la réponse complète** avec :
   - Status code 200
   - ✅ success: true
   - Client ID
   - Feedback ID

### Option B : Avec le fichier Batch

1. **Double-clic sur** : `test-webhook.bat`
2. Un terminal apparaît et exécute le test
3. Voir les résultats

### Option C : Avec Postman (Si tu l'as)

1. **Crée une requête POST**
2. **URL** : `http://localhost:3000/api/webhook`
3. **Headers** : `Content-Type: application/json`
4. **Body** (JSON) :
   ```json
   {
     "eventId": "test_001",
     "eventType": "FORM_RESPONSE",
     "data": {
       "responseId": "resp_001",
       "formId": "form_001",
       "fields": [
         {
           "key": "f1",
           "label": "Votre prénom",
           "type": "SHORT_TEXT",
           "value": "Marie"
         },
         {
           "key": "f2",
           "label": "Votre email",
           "type": "EMAIL",
           "value": "marie@example.com"
         },
         {
           "key": "f3",
           "label": "Comment évaluez-vous le contenu en général ?",
           "type": "RATING",
           "value": 9
         },
         {
           "key": "f4",
           "label": "Quelle est votre niveau de satisfaction général ?",
           "type": "RATING",
           "value": 8
         },
         {
           "key": "f5",
           "label": "Qu'avez-vous le plus apprécié ?",
           "type": "LONG_TEXT",
           "value": "Super atelier !"
         }
       ]
     }
   }
   ```
5. **Clique sur Send**

---

## ✅ ÉTAPE 5 : Vérifier que Tout Fonctionne

Si le test a réussi, tu dois voir :

### ✅ Dans Notion

1. **Va sur** : https://www.notion.so/
2. **Ouvre ta base de données** "Feedback Automation"
3. **Vérifie la table "Clients"** :
   - Un nouveau client "Marie" doit être ajouté
   - Avec l'email "marie@example.com"
   - Avec la date d'aujourd'hui

4. **Vérifie la table "Avis"** :
   - Un nouveau feedback doit être créé
   - Lié au client "Marie"
   - Note contenu: 9
   - Note globale: 8
   - Appréciation: "Super atelier !"
   - **Statut "Email Envoyé"** : ✅ Coché

### ✅ Dans ton Email

1. **Vérifie ta boîte mail** (personelle ou SpamFolder)
2. **Tu dois recevoir un email** :
   - De : `attimo@resend.dev`
   - Sujet : `Merci pour votre avis - Attimo`
   - Contenu : Message de remerciement personnalisé

---

## 🎓 Comprendre le Flux

```
        1. ENVOI
            ↓
  [test-webhook.ps1] 
        ↓
        POST /api/webhook
        ↓
        2. TRAITEMENT
        ↓
   ┌────────────────┐
   │   Code Webhook │
   │  (route.ts)    │
   └────────────────┘
        ↓
        3. SAUVEGARDE
        ↓
   ┌────────────────┐
   │ Table Clients  │ (Notion)
   └────────────────┘
        ↓
   ┌────────────────┐
   │ Table Avis     │ (Notion)
   └────────────────┘
        ↓
        4. EMAIL
        ↓
   ┌────────────────┐
   │   Resend API   │
   │ (email.ts)     │
   └────────────────┘
        ↓
        5. RÉPONSE
        ↓
  [Réponse JSON] ← tu reçois ceci
   ✅ success: true
   Client ID: ...
   Feedback ID: ...
```

---

## 🛑 Arrêter le Serveur

**Dans le terminal où tourne `npm run dev`** :
- **Appuie sur** : `Ctrl + C`
- Tu verras : `^C` et le serveur s'arrête

---

## 📊 Checklist Complète

- [ ] **Étape 1** : Terminal ouvert dans le bon dossier
- [ ] **Étape 2** : `npm run dev` lancé sans erreur
- [ ] **Étape 3** : http://localhost:3000 affiche la page verte
- [ ] **Étape 4** : Test webhook exécuté avec succès (optionnel)
- [ ] **Étape 5** : Nouvelle entrée visible dans Notion (optionnel)
- [ ] **Étape 5** : Email de remerciement reçu (optionnel)

---

## 🆘 Problèmes Courants

### ❌ "npm : commande introuvable"
**Cause** : Node.js n'est pas installé  
**Solution** : Installe Node.js : https://nodejs.org/

### ❌ "Port 3000 déjà utilisé"
**Cause** : Un autre programme utilise le port 3000  
**Solution** : 
```bash
npm run dev -- -p 3001
```
Puis accès à `http://localhost:3001`

### ❌ "Le terminal ferme tout seul"
**Cause** : Erreur lors du lancement  
**Solution** : Regarde les messages d'erreur dans le terminal et partage-les

### ❌ "La page affiche une erreur"
**Cause** : Problème de variables d'environnement  
**Solution** : Vérifie que `.env.local` est présent avec les bonnes clés

### ❌ "Le test webhook échoue"
**Cause** : Le serveur n'est pas lancé ou les variables sont incorrectes  
**Solution** :
1. Vérifie que `npm run dev` est toujours en cours dans un terminal
2. Vérifie que `.env.local` a les bonnes clés
3. Relance le serveur

---

## 💡 Conseils

- **La première fois est plus lente** : TypeScript compile, c'est normal (30-60s)
- **Les fichiers modifiés se rechargent automatiquement** : Change un fichier dans VS Code, la page se recharge toute seule
- **Regarde les logs du terminal** : Ils te donnent des infos précieuses en cas d'erreur
- **Le port 3000 est le standard** : C'est celui-ci qui est utilisé par défaut

---

## 🎉 C'est Tout !

Tu as maintenant un **serveur local complètement fonctionnel** qui peut :
- ✅ Recevoir des données via webhook
- ✅ Les sauvegarder dans Notion
- ✅ Envoyer des emails de remerciement

**Prêt pour la suite ? Déploie sur Vercel avec le guide `VERCEL_DEPLOY.md` !** 🚀
