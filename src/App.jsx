import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBooks, addBook, deleteBook, addLike, setSearch } from './features/books/booksSlice'
import BookList from './features/books/BookList'
import BookForm from './features/books/BookForm'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const { items, status, search } = useSelector(state => state.books)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  const filteredBooks = items.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddBook = (book) => dispatch(addBook(book))
  const handleDeleteBook = (id) => dispatch(deleteBook(id))
  const handleAddLike = (id) => dispatch(addLike(id))
  const handleSearchChange = (e) => dispatch(setSearch(e.target.value))

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <header className="header">
        <h1>📚 Gestion de Livres</h1>
        <button
          className="dark-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>

      <main>
        <input
          type="text"
          placeholder="Rechercher un livre..."
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />

        <BookForm onSubmit={handleAddBook} />

        {status === 'loading' && <p>Chargement...</p>}
        {status === 'failed' && <p>Erreur lors du chargement</p>}

        <BookList
          books={filteredBooks}
          onLike={handleAddLike}
          onDelete={handleDeleteBook}
        />
      </main>
    </div>
  )
}

export default App
