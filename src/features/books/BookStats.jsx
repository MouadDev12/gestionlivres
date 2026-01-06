import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { booksApi } from './booksApi'

const BookStats = () => {
  const { items } = useSelector(state => state.books)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const statsData = await booksApi.getStats()
        setStats(statsData)
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [items])

  if (loading) {
    return (
      <div className="stats-container">
        <div className="stats-loading">Chargement des statistiques...</div>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  const handleExport = async () => {
    try {
      await booksApi.exportBooks()
    } catch (error) {
      alert('Erreur lors de l\'exportation: ' + error.message)
    }
  }

  const handleImport = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    try {
      await booksApi.importBooks(file)
      window.location.reload() // Recharger pour voir les nouvelles données
    } catch (error) {
      alert('Erreur lors de l\'importation: ' + error.message)
    }
  }

  return (
    <div className="stats-container">
      <h2>📊 Statistiques de votre bibliothèque</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Livres au total</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.read}</div>
            <div className="stat-label">Livres lus</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📖</div>
          <div className="stat-content">
            <div className="stat-number">{stats.reading}</div>
            <div className="stat-label">En cours de lecture</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-number">{stats.averageRating}</div>
            <div className="stat-label">Note moyenne</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👍</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalLikes}</div>
            <div className="stat-label">Total des likes</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏷️</div>
          <div className="stat-content">
            <div className="stat-number">{stats.categoriesCount}</div>
            <div className="stat-label">Catégories</div>
          </div>
        </div>
      </div>

      {stats.recentlyAdded.length > 0 && (
        <div className="recent-books">
          <h3>📅 Derniers livres ajoutés</h3>
          <div className="recent-list">
            {stats.recentlyAdded.map(book => (
              <div key={book.id} className="recent-item">
                <div className="recent-info">
                  <strong>{book.title}</strong>
                  <span>par {book.author}</span>
                </div>
                <div className="recent-date">
                  {new Date(book.dateAdded).toLocaleDateString('fr-FR')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="data-management">
        <h3>💾 Gestion des données</h3>
        <div className="data-actions">
          <button onClick={handleExport} className="btn-export">
            📤 Exporter ma bibliothèque
          </button>
          
          <label className="btn-import">
            📥 Importer des livres
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <p className="data-info">
          Exportez vos données pour les sauvegarder ou les partager. 
          Importez un fichier JSON pour restaurer une bibliothèque.
        </p>
      </div>
    </div>
  )
}

export default BookStats