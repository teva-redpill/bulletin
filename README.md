# PayFit Verification React App

Application React + Vite inspirée des maquettes `verification.html` et `bulletin.html`.

## Fonctionnement

- L'utilisateur saisit un code à 6 chiffres.
- Le formulaire valide ce code.
- Si le code existe dans la table de données, l'écran du bulletin s'affiche.
- La période et les informations du bulletin changent dynamiquement selon le code saisi.

## Codes de test

- `123456`
- `654321`
- `111111`

## Lancer en local

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
```

## Déploiement sur Vercel

1. Importer le projet dans Vercel.
2. Framework preset: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`

Le fichier `vercel.json` est inclus pour gérer correctement le fallback côté client.

## Modifier les bulletins

Éditez l'objet `bulletinsByCode` dans `src/App.jsx` pour ajouter ou modifier les valeurs associées à chaque code.
