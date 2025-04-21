/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { disableScroll } from '../utils';
import css from './ReadingBookCurrent.module.css';

import { setAddToLibraryModalOpen } from '../../redux/filters/slice';
import { setCurrentBook } from '../../redux/books/slice';

function ReadingBookCurrent({ book }) {
  const dispatch = useDispatch();

  function onClick() {
    dispatch(setCurrentBook(book));
    dispatch(setAddToLibraryModalOpen(true));
    disableScroll();
  }
  return (
    <div className={css.bookContainer} onClick={onClick}>
      <img className={css.img} src={book.imageUrl} alt="Book photo" />

      <p className={css.title}>{book.title}</p>
      <p className={css.author}>{book.author}</p>
    </div>
  );
}

export default ReadingBookCurrent;
