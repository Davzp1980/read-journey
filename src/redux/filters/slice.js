import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    isModalOpen: false,
    isLibraryModalOpen: false,
    bookTitle: '',
    author: '',
    isLoading: false,
    error: null,
  },
  reducers: {
    setIsModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
    setAddToLibraryModalOpen(state, action) {
      state.isLibraryModalOpen = action.payload;
    },
    setBookTitle(state, action) {
      state.bookTitle = action.payload;
    },

    setBookAuthor(state, action) {
      state.author = action.payload;
    },
  },
});

export const {
  setIsModalOpen,
  setAddToLibraryModalOpen,
  setBookTitle,
  setBookAuthor,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
