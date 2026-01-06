import { useState } from 'react'

const BookCard = ({ book, onLike, onDelete, onEdit, onUpdateRating, onUpdateStatus }) => {
  const [showDetails, setShowDetails] = useState(false)

  const getStatusIcon = (status) => {
    switch (status) {
      case 'lu': return '✅'
      case 'en cours': return '📖'
      case 'à lire': return '📚'
      default: return '📚'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'lu': return '#28a745'
      case 'en cours': return '#ffc107'
      case 'à lire': return '#6c757d'
      default: return '#6c757d'
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`star ${i < rating ? 'filled' : ''}`}
        onClick={() => onUpdateRating(book.id, i + 1)}
      >
        ⭐
      </span>
    ))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  return (
    <div data-testid="book-card" className="book-card">
      <div className="book-card-header">
        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">par {book.author}</p>
          <div className="book-meta">
            <span className="book-category">{book.category}</span>
            <span className="book-year">{book.publishedYear}</span>
          </div>
        </div>
        
        <div className="book-status">
          <select
            value={book.status}
            onChange={(e) => onUpdateStatus(book.id, e.target.value)}
            className="status-select"
            style={{ color: getStatusColor(book.status) }}
          >
            <option value="à lire">📚 À lire</option>
            <option value="en cours">📖 En cours</option>
            <option value="lu">✅ Lu</option>
          </select>
        </div>
      </div>

      {book.description && (
        <p className="book-description">
          {showDetails ? book.description : `${book.description.substring(0, 100)}...`}
          {book.description.length > 100 && (
            <button 
              className="toggle-details"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Voir moins' : 'Voir plus'}
            </button>
          )}
        </p>
      )}

      <div className="book-rating">
        <span>Note: </span>
        <div className="stars">
          {renderStars(book.rating)}
        </div>
        <span className="rating-value">({book.rating}/5)</span>
      </div>

      <div className="book-stats">
        <span className="likes">
          <button className="like-btn" onClick={() => onLike(book.id)}>
            👍 {book.likes}
          </button>
        </span>
        <span className="date-added">
          Ajouté le {formatDate(book.dateAdded)}
        </span>
      </div>

      {book.isbn && (
        <div className="book-isbn">
          <small>ISBN: {book.isbn}</small>
        </div>
      )}

      <div className="book-actions">
        <button className="btn-edit" onClick={() => onEdit(book)}>
          ✏️ Modifier
        </button>
        <button className="btn-delete" onClick={() => onDelete(book.id)}>
          🗑️ Supprimer
        </button>
      </div>
    </div>
  )
}

export default BookCard
 