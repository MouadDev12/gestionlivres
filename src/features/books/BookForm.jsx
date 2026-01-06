import { useState } from 'react'

const BookForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (title.trim() === '') return
    onSubmit({ id: Date.now(), title })
    setTitle('')
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titre du livre"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  )
}

export default BookForm
