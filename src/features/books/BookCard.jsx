const BookCard = ({ book, onLike, onDelete }) => (
   <div data-testid="book-card" className="book-card">
     <div>
       <h3>{book.title}</h3>
       <p>Likes: {book.likes}</p>
     </div>
     <div>
       <button className="like-btn" onClick={() => onLike(book.id)}>👍</button>
       <button className="delete-btn" onClick={() => onDelete(book.id)}>🗑️</button>
     </div>
   </div>
 )
 
 export default BookCard
 