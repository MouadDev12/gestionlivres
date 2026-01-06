// API simulée pour la gestion des livres
const API_BASE_URL = 'https://jsonplaceholder.typicode.com' // API de test

// Simulation d'un délai réseau
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Données par défaut pour la démonstration
const defaultBooks = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "Un guide complet pour écrire du code propre, lisible et maintenable. Ce livre présente les principes fondamentaux du développement logiciel professionnel.",
    category: "Programmation",
    publishedYear: 2008,
    isbn: "978-0132350884",
    likes: 15,
    rating: 4.5,
    status: "lu",
    dateAdded: new Date('2024-01-15').toISOString()
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    description: "Conseils pratiques et techniques pour devenir un meilleur programmeur. Un classique incontournable du développement logiciel.",
    category: "Programmation",
    publishedYear: 1999,
    isbn: "978-0201616224",
    likes: 12,
    rating: 4.8,
    status: "à lire",
    dateAdded: new Date('2024-01-10').toISOString()
  },
  {
    id: 3,
    title: "Design Patterns",
    author: "Gang of Four",
    description: "Les 23 modèles de conception essentiels pour la programmation orientée objet. Une référence fondamentale en architecture logicielle.",
    category: "Programmation",
    publishedYear: 1994,
    isbn: "978-0201633610",
    likes: 8,
    rating: 4.2,
    status: "en cours",
    dateAdded: new Date('2024-01-05').toISOString()
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    description: "Un roman dystopique qui explore les thèmes de la surveillance, de la manipulation et du totalitarisme dans une société futuriste.",
    category: "Fiction",
    publishedYear: 1949,
    isbn: "978-0451524935",
    likes: 25,
    rating: 4.7,
    status: "lu",
    dateAdded: new Date('2023-12-20').toISOString()
  },
  {
    id: 5,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description: "Une brève histoire de l'humanité qui retrace l'évolution de notre espèce depuis les chasseurs-cueilleurs jusqu'à l'ère moderne.",
    category: "Histoire",
    publishedYear: 2011,
    isbn: "978-0062316097",
    likes: 18,
    rating: 4.4,
    status: "à lire",
    dateAdded: new Date('2023-12-15').toISOString()
  }
]

// Clé pour le localStorage
const STORAGE_KEY = 'library_books'

// Utilitaires pour le localStorage
const getStoredBooks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Erreur lors de la lecture du localStorage:', error)
    return null
  }
}

const setStoredBooks = (books) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
  } catch (error) {
    console.error('Erreur lors de la sauvegarde dans localStorage:', error)
  }
}

// API Functions
export const booksApi = {
  // Récupérer tous les livres
  async fetchBooks() {
    await delay(800) // Simuler un délai réseau
    
    const storedBooks = getStoredBooks()
    if (storedBooks && storedBooks.length > 0) {
      return storedBooks
    }
    
    // Initialiser avec les données par défaut
    setStoredBooks(defaultBooks)
    return defaultBooks
  },

  // Ajouter un livre
  async addBook(bookData) {
    await delay(300)
    
    const books = getStoredBooks() || []
    const newBook = {
      ...bookData,
      id: Date.now(),
      likes: 0,
      rating: 0,
      dateAdded: new Date().toISOString()
    }
    
    const updatedBooks = [newBook, ...books]
    setStoredBooks(updatedBooks)
    
    return newBook
  },

  // Mettre à jour un livre
  async updateBook(id, updates) {
    await delay(300)
    
    const books = getStoredBooks() || []
    const bookIndex = books.findIndex(book => book.id === id)
    
    if (bookIndex === -1) {
      throw new Error('Livre non trouvé')
    }
    
    const updatedBook = {
      ...books[bookIndex],
      ...updates,
      dateModified: new Date().toISOString()
    }
    
    books[bookIndex] = updatedBook
    setStoredBooks(books)
    
    return updatedBook
  },

  // Supprimer un livre
  async deleteBook(id) {
    await delay(300)
    
    const books = getStoredBooks() || []
    const filteredBooks = books.filter(book => book.id !== id)
    
    setStoredBooks(filteredBooks)
    return id
  },

  // Rechercher des livres par ISBN (simulation d'API externe)
  async searchByISBN(isbn) {
    await delay(1000)
    
    // Simulation d'une recherche externe
    const mockResults = [
      {
        title: "Livre trouvé par ISBN",
        author: "Auteur Exemple",
        description: "Description trouvée via l'API externe",
        publishedYear: 2023,
        category: "Fiction"
      }
    ]
    
    return mockResults
  },

  // Obtenir des suggestions de livres
  async getSuggestions(category = '') {
    await delay(500)
    
    const suggestions = [
      {
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        category: "Programmation",
        rating: 4.3
      },
      {
        title: "You Don't Know JS",
        author: "Kyle Simpson",
        category: "Programmation",
        rating: 4.6
      },
      {
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        category: "Programmation",
        rating: 4.4
      }
    ]
    
    return category 
      ? suggestions.filter(book => book.category.toLowerCase().includes(category.toLowerCase()))
      : suggestions
  },

  // Exporter les données
  async exportBooks() {
    const books = getStoredBooks() || []
    const dataStr = JSON.stringify(books, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ma-bibliotheque-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    return true
  },

  // Importer des données
  async importBooks(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const importedBooks = JSON.parse(e.target.result)
          
          if (!Array.isArray(importedBooks)) {
            throw new Error('Format de fichier invalide')
          }
          
          // Valider la structure des livres
          const validBooks = importedBooks.filter(book => 
            book.title && book.author && typeof book.id !== 'undefined'
          )
          
          if (validBooks.length === 0) {
            throw new Error('Aucun livre valide trouvé dans le fichier')
          }
          
          setStoredBooks(validBooks)
          resolve(validBooks)
        } catch (error) {
          reject(new Error('Erreur lors de l\'importation: ' + error.message))
        }
      }
      
      reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'))
      reader.readAsText(file)
    })
  },

  // Statistiques
  async getStats() {
    await delay(200)
    
    const books = getStoredBooks() || []
    
    const stats = {
      total: books.length,
      read: books.filter(book => book.status === 'lu').length,
      reading: books.filter(book => book.status === 'en cours').length,
      toRead: books.filter(book => book.status === 'à lire').length,
      averageRating: books.length > 0 
        ? (books.reduce((sum, book) => sum + (book.rating || 0), 0) / books.length).toFixed(1)
        : 0,
      totalLikes: books.reduce((sum, book) => sum + (book.likes || 0), 0),
      categoriesCount: [...new Set(books.map(book => book.category))].length,
      recentlyAdded: books
        .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
        .slice(0, 5)
    }
    
    return stats
  }
}

export default booksApi