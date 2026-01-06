import { useState } from 'react'

const BookForm = ({ onSubmit, editingBook, onCancel }) => {
  const [formData, setFormData] = useState({
    title: editingBook?.title || '',
    author: editingBook?.author || '',
    description: editingBook?.description || '',
    category: editingBook?.category || 'Fiction',
    publishedYear: editingBook?.publishedYear || new Date().getFullYear(),
    isbn: editingBook?.isbn || '',
    status: editingBook?.status || 'à lire'
  })

  const [errors, setErrors] = useState({})

  const categories = [
    'Fiction', 'Non-fiction', 'Science-fiction', 'Romance', 'Thriller',
    'Biographie', 'Histoire', 'Programmation', 'Business', 'Développement personnel'
  ]

  const statuses = [
    { value: 'à lire', label: '📚 À lire' },
    { value: 'en cours', label: '📖 En cours' },
    { value: 'lu', label: '✅ Lu' }
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis'
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'L\'auteur est requis'
    }
    
    if (formData.publishedYear < 1000 || formData.publishedYear > new Date().getFullYear()) {
      newErrors.publishedYear = 'Année invalide'
    }

    if (formData.isbn && !/^[\d-]{10,17}$/.test(formData.isbn.replace(/[-\s]/g, ''))) {
      newErrors.isbn = 'Format ISBN invalide'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const bookData = {
      ...formData,
      publishedYear: parseInt(formData.publishedYear)
    }

    if (editingBook) {
      onSubmit({ ...bookData, id: editingBook.id })
    } else {
      onSubmit(bookData)
    }

    // Reset form si ce n'est pas une édition
    if (!editingBook) {
      setFormData({
        title: '',
        author: '',
        description: '',
        category: 'Fiction',
        publishedYear: new Date().getFullYear(),
        isbn: '',
        status: 'à lire'
      })
    }
  }

  return (
    <div className="book-form-container">
      <h2>{editingBook ? 'Modifier le livre' : 'Ajouter un nouveau livre'}</h2>
      
      <form className="book-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Titre *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
              placeholder="Titre du livre"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="author">Auteur *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={errors.author ? 'error' : ''}
              placeholder="Nom de l'auteur"
            />
            {errors.author && <span className="error-message">{errors.author}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description du livre (optionnel)"
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Catégorie</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="publishedYear">Année de publication</label>
            <input
              type="number"
              id="publishedYear"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              className={errors.publishedYear ? 'error' : ''}
              min="1000"
              max={new Date().getFullYear()}
            />
            {errors.publishedYear && <span className="error-message">{errors.publishedYear}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="status">Statut</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="isbn">ISBN (optionnel)</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className={errors.isbn ? 'error' : ''}
            placeholder="978-0-123456-78-9"
          />
          {errors.isbn && <span className="error-message">{errors.isbn}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingBook ? 'Mettre à jour' : 'Ajouter le livre'}
          </button>
          {editingBook && (
            <button type="button" onClick={onCancel} className="btn-secondary">
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default BookForm
