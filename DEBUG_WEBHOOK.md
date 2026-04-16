# 🔍 Checklist Debug - Webhook Tally

## Problème Possible : Les Données N'Arrivent Pas en Notion

### 1. Vérifier les Logs Vercel
- Va sur **Vercel Dashboard** → Ton projet 
- Clique sur **"Logs"** en haut
- Tu dois voir le POST du formulaire + éventuellement une erreur

### 2. Problèmes Courants

**A. Les noms des champs Tally ne correspondent pas**
- Dans le code, on attend : `"Votre prénom"`, `"Votre email"`, etc.
- Si Tally a des noms DIFFÉRENTS → le code ne les reconnaît pas

**B. Les variables d'environnement ne sont pas passées**
- Vercel a besoin d'une redémarche après ajouter les env vars
- Clique sur "Redeploy" dans Vercel

**C. Les IDs Notion sont incorrects**
- Vérifies que les IDs matchent exactement ceux dans les variables

### 3. Solution Rapide : Check les Noms des Champs

Ouvre ton formulaire Tally et dis-moi **EXACTEMENT** les noms des champs :
- Quel est le nom exact du champ "Prénom" ?
- Quel est le nom exact du champ "Email" ?
- Etc.

Je vais adapter le code pour matcher les vrais noms !

---

## 🔧 Étapes à Faire

1. **Check les logs Vercel** (copie-colle ce que tu vois)
2. **Dis-moi les noms exacts des champs Tally**
3. **Je corrige le code si nécessaire**
4. **On reteste**

**Quel message d'erreur tu vois dans les logs Vercel ?** 📝
