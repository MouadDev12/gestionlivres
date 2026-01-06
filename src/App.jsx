import React, { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  fetchBooks, 
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
} from './features/books/booksSlice'
import BookList from './features/books/BookList'
import BookForm from './features/books/BookForm'
import BookStats from './features/books/BookStats'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const { items, status, search, filter, sortBy, error } = useSelector(state => state.books)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [activeTab, setActiveTab] = useState('library')

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
    document.body.className = darkMode ? 'dark-mode' : ''
  }, [darkMode])

  // Filtrage et tri des livres
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = items.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) ||
                           book.author.toLowerCase().includes(search.toLowerCase()) ||
                           book.category.toLowerCase().includes(search.toLowerCase())
      
      const matchesFilter = filter === 'all' || book.status === filter
      
      return matchesSearch && matchesFilter
    })

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'author':
          return a.author.localeCompare(b.author)
        case 'rating':
          return b.rating - a.rating
        case 'dateAdded':
        default:
          return new Date(b.dateAdded) - new Date(a.dateAdded)
      }
    })

    return filtered
  }, [items, search, filter, sortBy])

  const handleAddBook = (book) => {
    dispatch(addBook(book))
    setShowForm(false)
  }

  const handleEditBook = (book) => {
    dispatch(editBook(book))
    setEditingBook(null)
    setShowForm(false)
  }

  const handleDeleteBook = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      dispatch(deleteBook(id))
    }
  }

  const handleEditClick = (book) => {
    setEditingBook(book)
    setShowForm(true)
    setActiveTab('library') // Retourner à l'onglet bibliothèque pour voir le formulaire
  }

  const handleCancelEdit = () => {
    setEditingBook(null)
    setShowForm(false)
  }

  const getBookStats = () => {
    const total = items.length
    const read = items.filter(book => book.status === 'lu').length
    const reading = items.filter(book => book.status === 'en cours').length
    const toRead = items.filter(book => book.status === 'à lire').length
    
    return { total, read, reading, toRead }
  }

  const stats = getBookStats()

  const tabs = [
    { id: 'library', label: '📚 Ma Bibliothèque', count: items.length },
    { id: 'stats', label: '📊 Statistiques', count: null }
  ]

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header className="header">
        <div className="header-content">
          <h1>📚 Ma Bibliothèque Personnelle</h1>
          <div className="header-actions">
            {activeTab === 'library' && (
              <button
                className="btn-add"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? '❌ Fermer' : '➕ Ajouter un livre'}
              </button>
            )}
            <button
              className="dark-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Mode clair' : 'Mode sombre'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="stats-bar">
          <div className="stat">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.read}</span>
            <span className="stat-label">Lus</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.reading}</span>
            <span className="stat-label">En cours</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.toRead}</span>
            <span className="stat-label">À lire</span>
          </div>
        </div>
      </header>

      <main>
        {/* Navigation par onglets */}
        <div className="tabs-container">
          <nav className="tabs-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className="tab-count"> ({tab.count})</span>
                )}
              </button>
            ))}
          </nav>

          <div className="tab-content">
            {activeTab === 'library' && (
              <>
                {/* Formulaire d'ajout/édition */}
                {showForm && (
                  <BookForm 
                    onSubmit={editingBook ? handleEditBook : handleAddBook}
                    editingBook={editingBook}
                    onCancel={handleCancelEdit}
                  />
                )}

                {/* Contrôles de recherche et filtrage */}
                <div className="controls">
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Rechercher par titre, auteur ou catégorie..."
                      value={search}
                      onChange={(e) => dispatch(setSearch(e.target.value))}
                      className="search-input"
                    />
                  </div>

                  <div className="filters">
                    <select
                      value={filter}
                      onChange={(e) => dispatch(setFilter(e.target.value))}
                      className="filter-select"
                    >
                      <option value="all">Tous les livres</option>
                      <option value="à lire">📚 À lire</option>
                      <option value="en cours">📖 En cours</option>
                      <option value="lu">✅ Lus</option>
                    </select>

                    <select
                      value={sortBy}
                      onChange={(e) => dispatch(setSortBy(e.target.value))}
                      className="sort-select"
                    >
                      <option value="dateAdded">Plus récents</option>
                      <option value="title">Titre A-Z</option>
                      <option value="author">Auteur A-Z</option>
                      <option value="rating">Mieux notés</option>
                    </select>
                  </div>
                </div>

                {/* Messages d'état */}
                {status === 'loading' && (
                  <div className="loading">
                    <div className="spinner"></div>
                    <p>Chargement de votre bibliothèque...</p>
                  </div>
                )}

                {error && (
                  <div className="error-message">
                    <p>❌ {error}</p>
                    <button onClick={() => dispatch(clearError())}>Fermer</button>
                  </div>
                )}

                {/* Liste des livres */}
                {status === 'succeeded' && (
                  <BookList
                    books={filteredAndSortedBooks}
                    onLike={(id) => dispatch(addLike(id))}
                    onDelete={handleDeleteBook}
                    onEdit={handleEditClick}
                    onUpdateRating={(id, rating) => dispatch(updateRating({ id, rating }))}
                    onUpdateStatus={(id, status) => dispatch(updateStatus({ id, status }))}
                  />
                )}
              </>
            )}

            {activeTab === 'stats' && <BookStats />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
