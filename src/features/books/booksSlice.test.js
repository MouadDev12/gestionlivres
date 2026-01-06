import booksReducer, {
   addBook,
   editBook,
   deleteBook,
   addLike,
   setSearch
 } from './booksSlice'
 
 describe('booksSlice reducers', () => {
 
   const initialState = {
     items: [],
     status: 'idle',
     search: ''
   }
 
   test('should return initial state', () => {
     expect(booksReducer(undefined, { type: 'unknown' }))
       .toEqual(initialState)
   })
 
   test('should add a book', () => {
     const state = booksReducer(initialState, addBook({
       id: 1,
       title: 'React',
       author: 'Dan'
     }))
 
     expect(state.items.length).toBe(1)
     expect(state.items[0].likes).toBe(0)
   })
 
   test('should edit a book', () => {
     const state = booksReducer({
       ...initialState,
       items: [{ id: 1, title: 'Old', likes: 0 }]
     }, editBook({ id: 1, title: 'New' }))
 
     expect(state.items[0].title).toBe('New')
   })
 
   test('should delete a book', () => {
     const state = booksReducer({
       ...initialState,
       items: [{ id: 1, title: 'JS' }]
     }, deleteBook(1))
 
     expect(state.items.length).toBe(0)
   })
 
   test('should add like', () => {
     const state = booksReducer({
       ...initialState,
       items: [{ id: 1, title: 'Redux', likes: 0 }]
     }, addLike(1))
 
     expect(state.items[0].likes).toBe(1)
   })
 
   test('should set search', () => {
     const state = booksReducer(initialState, setSearch('react'))
     expect(state.search).toBe('react')
   })
 })
 