import { render, screen, fireEvent } from '@testing-library/react'
import BookCard from './BookCard'

test('renders book card', () => {
  const book = { id: 1, title: 'React', likes: 0 }

  render(
    <BookCard book={book} onLike={jest.fn()} onDelete={jest.fn()} />
  )

  expect(screen.getByText('React')).toBeInTheDocument()
  expect(screen.getByText(/Likes/)).toBeInTheDocument()
})

test('like button works', () => {
  const onLike = jest.fn()

  render(
    <BookCard
      book={{ id: 1, title: 'JS', likes: 0 }}
      onLike={onLike}
      onDelete={jest.fn()}
    />
  )

  fireEvent.click(screen.getByText('Like'))
  expect(onLike).toHaveBeenCalledWith(1)
})
