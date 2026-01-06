import BookCard from './BookCard'

const BookList = ({ books, onLike, onDelete }) => (
  <div>
    {books.length === 0 ? (
      <p>Aucun livre trouvé</p>
    ) : (
      books.map(book => (
        <BookCard
          key={book.id}
          book={book}
          onLike={onLike}
          onDelete={onDelete}
        />
      ))
    )}
  </div>
)

export default BookList
