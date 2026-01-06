import { render, screen, fireEvent } from '@testing-library/react'
import BookForm from './BookForm'

test('submit form adds book', () => {
  const onSubmit = jest.fn()

  render(<BookForm onSubmit={onSubmit} />)

  fireEvent.change(screen.getByPlaceholderText('Book title'), {
    target: { value: 'New Book' }
  })

  fireEvent.click(screen.getByText('Add'))

  expect(onSubmit).toHaveBeenCalled()
  expect(onSubmit.mock.calls[0][0].title).toBe('New Book')
})
