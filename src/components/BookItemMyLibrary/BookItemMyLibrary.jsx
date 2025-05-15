/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';

import css from './BookItemMyLibrary.module.css';

import { deleteUsersBook } from '../../redux/books/operations';
import { useNavigate } from 'react-router';
import { setCurrentBook } from '../../redux/books/slice';

function BookItemMyLibrary({ book }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function onClickPhoto() {
    dispatch(setCurrentBook(book));
    navigate('/reading');
  }

  function handleDelete() {
    dispatch(deleteUsersBook(book._id));
  }
  return (
    <div className={css.bookContainer}>
      <img
        className={css.img}
        src={book.imageUrl}
        alt="Book photo"
        onClick={onClickPhoto}
      />

      <div className={css.deleteDiv}>
        <div>
          <p className={css.title}>{book.title}</p>
          <p className={css.author}>{book.author}</p>
        </div>
        <button className={css.deleteBtn} type="button" onClick={handleDelete}>
          <img
            className={css.deleteSvg}
            src="/img/deleteBucket.webp"
            alt="delete"
          />
        </button>
      </div>
    </div>
  );
}

export default BookItemMyLibrary;
