import { useForm } from 'react-hook-form';
import css from './LibraryBoard.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';

import { useDispatch, useSelector } from 'react-redux';

import { addNewBook } from '../../redux/books/operations';
import toast from 'react-hot-toast';

import { Swiper, SwiperSlide } from 'swiper/react';

import {
  selectCurrentBook,
  selectRecomendedBooks,
} from '../../redux/books/selectors';
import BookItemLibrary from '../BookItemLibrary/BookItemLibrary';
import AddToLibraryModal from '../AddToLibraryModal/AddToLibraryModal';
import { selectIsLibraryModalOpen } from '../../redux/filters/selectors';

function LibraryBoard() {
  const dispatch = useDispatch();

  const books = useSelector(selectRecomendedBooks);
  const book = useSelector(selectCurrentBook);

  const isLibraryModalOpen = useSelector(selectIsLibraryModalOpen);

  const ValidationSchema = yup.object().shape({
    bookTitle: yup.string(),
    author: yup.string(),
    numberOfPages: yup.string(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(ValidationSchema),
  });

  function onSubmit(data) {
    dispatch(
      addNewBook({
        title: data.bookTitle,
        author: data.author,
        totalPages: data.numberOfPages,
      })
        .unwrap()
        .then(() => {
          toast.success('The book was added successfully');
        })
        .catch(() => {
          toast.error('Error adding a book');
          return;
        })
    );
  }
  return (
    <div className={css.contentContainer}>
      <p className={css.pFilters}>Filters:</p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputWrapper}>
          <label className={css.label} htmlFor="bookTitle">
            Book title:
          </label>
          <input
            className={clsx(css.bookTitle, css.input)}
            id="bookTitle"
            type="text"
            {...register('bookTitle')}
            placeholder="I See You Are Interested In The Dark"
          />
        </div>

        <div className={css.inputWrapper}>
          <label className={css.label} htmlFor="author">
            The author:
          </label>
          <input
            className={clsx(css.author, css.input)}
            id="author"
            type="text"
            {...register('author')}
            placeholder="Hilarion Pavlyuk"
          />
        </div>

        <div className={css.inputWrapper}>
          <label className={css.label} htmlFor="numberOfPages">
            Number of pages:
          </label>
          <input
            className={clsx(css.numberOfPages, css.input)}
            id="numberOfPages"
            type="text"
            {...register('numberOfPages')}
            placeholder="664"
          />
        </div>
        <button className={css.toApplyBtn} type="submit">
          Add book
        </button>
      </form>

      <div className={css.recomendedContainer}>
        <h2 className={css.h2}>Recommended books</h2>

        <div className="slider-container">
          <Swiper spaceBetween={20} slidesPerView={3}>
            {books.map(book => (
              <SwiperSlide key={book._id}>
                <BookItemLibrary book={book} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {isLibraryModalOpen && <AddToLibraryModal book={book} />}
    </div>
  );
}

export default LibraryBoard;
