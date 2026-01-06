# 📚 Ma Bibliothèque Personnelle

Une application moderne de gestion de livres développée avec React, Redux Toolkit et Vite. Gérez votre collection de livres avec style et efficacité !

## ✨ Fonctionnalités

### 📖 Gestion des Livres
- **Ajout complet** : Titre, auteur, description, catégorie, année, ISBN, statut
- **Modification** : Édition complète de tous les champs
- **Suppression** : Avec confirmation de sécurité
- **Statuts** : À lire, En cours, Lu
- **Notation** : Système d'étoiles (1-5)
- **Likes** : Système d'appréciation

### 🔍 Recherche et Filtrage
- **Recherche intelligente** : Par titre, auteur ou catégorie
- **Filtres** : Par statut de lecture
- **Tri** : Par date, titre, auteur ou note
- **Résultats en temps réel**

### 📊 Statistiques Avancées
- **Vue d'ensemble** : Total, lus, en cours, à lire
- **Métriques** : Note moyenne, total des likes, nombre de catégories
- **Historique** : Derniers livres ajoutés
- **Graphiques visuels** avec icônes

### 💾 Gestion des Données
- **Sauvegarde automatique** : LocalStorage intégré
- **Export** : Téléchargement JSON de votre bibliothèque
- **Import** : Restauration depuis un fichier JSON
- **Persistance** : Vos données restent même après fermeture

### 🎨 Interface Moderne
- **Design responsive** : Adapté mobile, tablette, desktop
- **Mode sombre/clair** : Basculement avec persistance
- **Animations fluides** : Transitions et effets hover
- **Navigation par onglets** : Bibliothèque et Statistiques
- **Formulaires validés** : Validation en temps réel

## 🚀 Technologies Utilisées

- **React 19** - Framework UI moderne
- **Redux Toolkit** - Gestion d'état prévisible
- **Vite** - Build tool ultra-rapide
- **CSS3** - Variables CSS, Grid, Flexbox
- **LocalStorage** - Persistance des données
- **ESLint** - Qualité du code

## 📦 Installation et Démarrage

```bash
# Cloner le projet
git clone [url-du-repo]
cd gestionlivres

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview

# Linter le code
npm run lint
```

## 🏗️ Structure du Projet

```
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
```

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

## 🔧 Configuration

### Variables CSS Personnalisables
```css
:root {
  --primary-color: #2563eb;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  /* ... autres variables */
}
```

### LocalStorage
- Clé : `library_books`
- Format : JSON Array
- Sauvegarde automatique à chaque modification

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- React Team pour l'excellent framework
- Redux Toolkit pour la gestion d'état simplifiée
- Vite pour l'expérience de développement rapide
- La communauté open source pour l'inspiration

---

**Développé avec ❤️ pour les amoureux des livres**# gestionlivres
