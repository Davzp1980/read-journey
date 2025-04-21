import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBooksRecommend = createAsyncThunk(
  'books/recomended',
  async function (_, thunkAPI) {
    try {
      const res = await axios.get('/books/recommend');

      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addBookFromRecomended = createAsyncThunk(
  'books/addBookFromRecomended',
  async function (id, thunkAPI) {
    try {
      const res = await axios.post(`/books/add/${id}`);

      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addNewBook = createAsyncThunk(
  'books/addNewBook',
  async function (book, thunkAPI) {
    try {
      const res = await axios.post('/books/add', book);

      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getUsersBooks = createAsyncThunk(
  'books/getUsersBooks',
  async function (_, thunkAPI) {
    try {
      const res = await axios.get('/books/own');

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteUsersBook = createAsyncThunk(
  'books/deleteUsersBook',
  async function (id, thunkAPI) {
    try {
      const res = await axios.delete(`books/remove/${id}`);

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
