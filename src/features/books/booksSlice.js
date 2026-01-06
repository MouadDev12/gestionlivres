import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Thunk API
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async () => {
    const res = await fetch('https://example.com/books')
    return res.json()
  }
)

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    search: ''
  },
  reducers: {
    addBook: (state, action) => {
      state.items.push({
        ...action.payload,
        likes: 0
      })
    },

    editBook: (state, action) => {
      const index = state.items.findIndex(
        book => book.id === action.payload.id
      )
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload
        }
      }
    },

    deleteBook: (state, action) => {
      state.items = state.items.filter(
        book => book.id !== action.payload
      )
    },

    addLike: (state, action) => {
      const book = state.items.find(
        book => book.id === action.payload
      )
      if (book) {
        book.likes += 1
      }
    },

    setSearch: (state, action) => {
      state.search = action.payload
    }
  },

  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export const {
  addBook,
  editBook,
  deleteBook,
  addLike,
  setSearch
} = booksSlice.actions

export default booksSlice.reducer
