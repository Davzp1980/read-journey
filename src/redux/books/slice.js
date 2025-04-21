import { createSlice } from '@reduxjs/toolkit';
import {
  addBookFromRecomended,
  addNewBook,
  deleteUsersBook,
  getBooksRecommend,
  getUsersBooks,
} from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    recomended: [],
    favorites: [],
    library: [],
    book: [],
    isModalAddBookOk: false,
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    builder
      .addCase(getBooksRecommend.pending, handlePending)
      .addCase(getBooksRecommend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.recomended = action.payload;
      })
      .addCase(getBooksRecommend.rejected, handleRejected)

      .addCase(addNewBook.pending, handlePending)
      .addCase(addNewBook.fulfilled, state => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(addBookFromRecomended.pending, handlePending)
      .addCase(addBookFromRecomended.fulfilled, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBookFromRecomended.rejected, handleRejected)

      .addCase(getUsersBooks.pending, handlePending)
      .addCase(getUsersBooks.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUsersBook.pending, handlePending)
      .addCase(deleteUsersBook.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          book => book._id !== action.payload.id
        );
      })
      .addCase(deleteUsersBook.rejected, handleRejected);
  },
  reducers: {
    setCurrentBook(state, action) {
      state.book = action.payload;
    },

    setAddBookToLibrary(state, action) {
      state.library.push(action.payload);
    },
  },
});

export const { setCurrentBook, setAddBookToLibrary } = booksSlice.actions;

export const booksReducer = booksSlice.reducer;
