/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import css from './AddToLibraryModal.module.css';
import { setAddToLibraryModalOpen } from '../../redux/filters/slice';
import { useEffect } from 'react';
import { selectIsLibraryModalOpen } from '../../redux/filters/selectors';
import { enableScroll } from '../utils';
import { addBookFromRecomended } from '../../redux/books/operations';
import toast from 'react-hot-toast';
import { selectFavoriteBooks } from '../../redux/books/selectors';
import { setAddBookToLibrary } from '../../redux/books/slice';

function AddToLibraryModal({ book }) {
  const dispatch = useDispatch();
  const isAddToLibraryModalOpen = useSelector(selectIsLibraryModalOpen);
  const favoriteBooks = useSelector(selectFavoriteBooks);
  console.log(favoriteBooks);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        dispatch(setAddToLibraryModalOpen(false));
        enableScroll();
      }
    };

    if (isAddToLibraryModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAddToLibraryModalOpen, dispatch]);

  if (!isAddToLibraryModalOpen) return null;

  function onClickClose() {
    enableScroll();
    dispatch(setAddToLibraryModalOpen(false));
  }

  function onClickAddToLibrary() {
    dispatch(setAddBookToLibrary(book));
    const isInFavorites = favoriteBooks.some(fav => fav.title === book.title);
    console.log(book.title);

    if (isInFavorites) {
      toast.error('The book already presents in favorites');
      return;
    }
    dispatch(addBookFromRecomended(book._id))
      .unwrap()
      .then(() => {
        toast.success('The book was added successfully');
      })
      .catch(() => {
        toast.error('Error adding a book');
        return;
      });
  }

  return (
    <div className={css.backdrop} onClick={onClickClose}>
      <div className={css.modalContainer}>
        <img className={css.bookImg} src={book.imageUrl} alt="Book photo" />
        <p className={css.title}>{book.title}</p>
        <p className={css.author}>{book.author}</p>
        <p className={css.totalPages}>{book.totalPages} pages</p>
        <button
          className={css.AddToLibraryBtn}
          type="button"
          onClick={onClickAddToLibrary}
        >
          Add to library
        </button>
        <button className={css.closeBtn} type="button" onClick={onClickClose}>
          <svg className={css.closeSvg}>
            <use href="/public/sprite.svg#close"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default AddToLibraryModal;
