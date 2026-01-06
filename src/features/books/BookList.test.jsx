import { render, screen } from '@testing-library/react'
import BookList from './BookList'

test('renders list of books', () => {
  const books = [
    { id: 1, title: 'React', likes: 0 },
    { id: 2, title: 'Redux', likes: 1 }
  ]

  render(
    <BookList books={books} onLike={jest.fn()} onDelete={jest.fn()} />
  )

  expect(screen.getAllByTestId('book-card').length).toBe(2)
})
