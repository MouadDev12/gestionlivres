import BookCard from './BookCard'

const BookList = ({ books, onLike, onDelete, onEdit, onUpdateRating, onUpdateStatus }) => {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📚</div>
        <h3>Aucun livre trouvé</h3>
        <p>Commencez par ajouter votre premier livre à votre bibliothèque !</p>
      </div>
    )
  }

  return (
    <div className="book-list">
      <div className="book-count">
        <span>{books.length} livre{books.length > 1 ? 's' : ''} trouvé{books.length > 1 ? 's' : ''}</span>
      </div>
      
      <div className="books-grid">
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onLike={onLike}
            onDelete={onDelete}
            onEdit={onEdit}
            onUpdateRating={onUpdateRating}
            onUpdateStatus={onUpdateStatus}
          />
        ))}
      </div>
    </div>
  )
}

export default BookList
