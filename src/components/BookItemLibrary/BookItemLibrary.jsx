/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';

import css from './BookItemLibrary.module.css';

import { setAddToLibraryModalOpen } from '../../redux/filters/slice';
import { setCurrentBook } from '../../redux/books/slice';

function BookItemLibrary({ book }) {
  const dispatch = useDispatch();

  function onClick() {
    dispatch(setCurrentBook(book));
    dispatch(setAddToLibraryModalOpen(true));
  }
  return (
    <div className={css.bookContainer}>
      <img
        className={css.img}
        src={book.imageUrl}
        alt="Book photo"
        onClick={onClick}
      />

      <p className={css.title}>{book.title}</p>
      <p className={css.author}>{book.author}</p>
    </div>
  );
}

export default BookItemLibrary;
