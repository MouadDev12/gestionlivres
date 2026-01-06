// booksApi.js
// Gestion des appels API pour les livres

const API_URL = 'https://example.com/books' // Remplace par ton API réelle

// Récupérer tous les livres
export const fetchBooksApi = async () => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des livres')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Ajouter un livre (si ton API le permet)
export const addBookApi = async (book) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
    if (!response.ok) {
      throw new Error('Erreur lors de l’ajout du livre')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Supprimer un livre
export const deleteBookApi = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du livre')
    }
    return true
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Modifier un livre
export const editBookApi = async (book) => {
  try {
    const response = await fetch(`${API_URL}/${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la modification du livre')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
