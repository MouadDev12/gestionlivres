# 📚 Gestionnaire de Bibliothèque Personnelle

Une application web moderne et intuitive pour gérer votre collection de livres, développée avec React 19, Redux Toolkit et Vite. Interface responsive avec thème sombre/clair et fonctionnalités avancées de recherche et statistiques.



## ✨ Fonctionnalités Principales

### 📖 Gestion Complète des Livres
- **CRUD complet** : Ajout, modification, suppression avec validation
- **Métadonnées riches** : Titre, auteur, description, catégorie, année, ISBN
- **Système de statuts** : À lire, En cours, Lu avec indicateurs visuels
- **Notation par étoiles** : Système de rating de 1 à 5 étoiles
- **Système de likes** : Marquez vos livres favoris

### 🔍 Recherche et Filtrage Avancés
- **Recherche intelligente** : Multi-critères (titre, auteur, catégorie)
- **Filtres dynamiques** : Par statut de lecture en temps réel
- **Tri personnalisable** : Date, titre, auteur, note avec ordre croissant/décroissant
- **Résultats instantanés** : Mise à jour en temps réel pendant la saisie

### 📊 Tableau de Bord et Statistiques
- **Métriques détaillées** : Livres totaux, lus, en cours, à lire
- **Analyses avancées** : Note moyenne, total des likes, diversité des catégories
- **Historique** : Derniers livres ajoutés avec dates
- **Export/Import** : Sauvegarde et restauration des données JSON

### 🎨 Interface Utilisateur Moderne
- **Design responsive** : Optimisé mobile-first (320px à 4K)
- **Thème adaptatif** : Mode sombre/clair avec persistance utilisateur
- **Animations fluides** : Transitions CSS3 et micro-interactions
- **Navigation intuitive** : Onglets, formulaires modaux, feedback visuel

## �️ Sthack Technique


- **React** : Framework UI avec hooks modernes 
- **Redux Toolkit**: Gestion d'état prévisible et optimisée 
- **Vite** : Build tool ultra-rapide avec HMR 
- **CSS3** : Variables CSS, Grid, Flexbox, animations 
- **LocalStorage** :  Persistance des données côté client 
- **ESLint** : Qualité et cohérence du code 

### Architecture
- **Pattern Redux** : Actions, reducers, store centralisé
- **Composants fonctionnels** : Hooks React (useState, useEffect, useMemo)
- **API simulée** : Gestion asynchrone avec createAsyncThunk
- **Responsive Design** : Mobile-first avec breakpoints adaptatifs


```

## 🏗️ Structure du Projet


src/
├── app/
│   └── store.js              # Configuration Redux
├── features/
│   └── books/
│       ├── booksSlice.js     # État et actions Redux
│       ├── booksApi.js       # API et gestion des données
│       ├── BookList.jsx      # Liste des livres
│       ├── BookCard.jsx      # Carte individuelle
│       ├── BookForm.jsx      # Formulaire d'ajout/édition
│       └── BookStats.jsx     # Statistiques avancées
├── App.jsx                   # Composant principal
├── App.css                   # Styles globaux
└── main.jsx                  # Point d'entrée


## 🎯 Utilisation

### Ajouter un Livre
1. Cliquez sur "➕ Ajouter un livre"
2. Remplissez le formulaire (titre et auteur requis)
3. Sélectionnez la catégorie et le statut
4. Cliquez sur "Ajouter le livre"

### Gérer vos Livres
- **Noter** : Cliquez sur les étoiles (1-5)
- **Liker** : Bouton 👍 pour apprécier
- **Changer le statut** : Menu déroulant sur chaque carte
- **Modifier** : Bouton ✏️ pour éditer
- **Supprimer** : Bouton 🗑️ avec confirmation

### Rechercher et Filtrer
- **Barre de recherche** : Tapez pour filtrer en temps réel
- **Filtre par statut** : Tous, À lire, En cours, Lus
- **Tri** : Plus récents, Titre A-Z, Auteur A-Z, Mieux notés

### Voir les Statistiques
1. Cliquez sur l'onglet "📊 Statistiques"
2. Consultez vos métriques de lecture
3. Exportez/importez vos données

## 🎨 Personnalisation

### Thèmes
- **Mode clair** : Interface lumineuse et moderne
- **Mode sombre** : Confort visuel en faible luminosité
- **Persistance** : Votre choix est sauvegardé

### Catégories Disponibles
- Fiction, Non-fiction, Science-fiction
- Romance, Thriller, Biographie
- Histoire, Programmation, Business
- Développement personnel

## 💡 Fonctionnalités Avancées

### Validation des Données
- **Titre et auteur** : Champs obligatoires
- **Année** : Validation de plage (1000-2024)
- **ISBN** : Format validé automatiquement
- **Messages d'erreur** : Feedback en temps réel

### Gestion d'État
- **Redux Toolkit** : État centralisé et prévisible
- **Actions asynchrones** : Chargement avec états
- **Persistance** : Synchronisation avec localStorage

### Performance
- **Mémoïsation** : Filtrage et tri optimisés
- **Lazy loading** : Chargement différé des composants
- **Transitions** : Animations fluides sans lag




## 🙏 Remerciements

- React Team pour l'excellent framework
- Redux Toolkit pour la gestion d'état simplifiée
- Vite pour l'expérience de développement rapide
- La communauté open source pour l'inspiration

---

**Développé avec ❤️ pour les amoureux des livres**
