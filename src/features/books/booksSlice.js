import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Simulation d'une API avec données locales
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async () => {
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Récupérer depuis localStorage ou retourner des données par défaut
    const savedBooks = localStorage.getItem('books')
    if (savedBooks) {
      return JSON.parse(savedBooks)
    }
    
    // Données par défaut
    return [
      {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin",
        description: "Un guide pour écrire du code propre et maintenable",
        category: "Programmation",
        publishedYear: 2008,
        isbn: "978-0132350884",
        likes: 15,
        rating: 4.5,
        status: "lu",
        dateAdded: new Date().toISOString()
      },
      {
        id: 2,
        title: "The Pragmatic Programmer",
        author: "David Thomas, Andrew Hunt",
        description: "Conseils pratiques pour devenir un meilleur programmeur",
        category: "Programmation",
        publishedYear: 1999,
        isbn: "978-0201616224",
        likes: 12,
        rating: 4.8,
        status: "à lire",
        dateAdded: new Date().toISOString()
      }
    ]
  }
)

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    search: '',
    filter: 'all', // all | lu | en cours | à lire
    sortBy: 'dateAdded', // title | author | dateAdded | rating
    error: null
  },
  reducers: {
    addBook: (state, action) => {
      const newBook = {
        ...action.payload,
        id: Date.now(),
        likes: 0,
        rating: 0,
        dateAdded: new Date().toISOString()
      }
      state.items.unshift(newBook)
      // Sauvegarder dans localStorage
      localStorage.setItem('books', JSON.stringify(state.items))
    },

    editBook: (state, action) => {
      const index = state.items.findIndex(
        book => book.id === action.payload.id
      )
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
          dateModified: new Date().toISOString()
        }
        localStorage.setItem('books', JSON.stringify(state.items))
      }
    },

    deleteBook: (state, action) => {
      state.items = state.items.filter(
        book => book.id !== action.payload
      )
      localStorage.setItem('books', JSON.stringify(state.items))
    },

    addLike: (state, action) => {
      const book = state.items.find(
        book => book.id === action.payload
      )
      if (book) {
        book.likes += 1
        localStorage.setItem('books', JSON.stringify(state.items))
      }
    },

    updateRating: (state, action) => {
      const { id, rating } = action.payload
      const book = state.items.find(book => book.id === id)
      if (book) {
        book.rating = rating
        localStorage.setItem('books', JSON.stringify(state.items))
      }
    },

    updateStatus: (state, action) => {
      const { id, status } = action.payload
      const book = state.items.find(book => book.id === id)
      if (book) {
        book.status = status
        localStorage.setItem('books', JSON.stringify(state.items))
      }
    },

    setSearch: (state, action) => {
      state.search = action.payload
    },

    setFilter: (state, action) => {
      state.filter = action.payload
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },

    clearError: (state) => {
      state.error = null
    }
  },

  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Erreur lors du chargement'
      })
  }
})

export const {
  addBook,
  editBook,
  deleteBook,
  addLike,
  updateRating,
  updateStatus,
  setSearch,
  setFilter,
  setSortBy,
  clearError
} = booksSlice.actions

export default booksSlice.reducer
