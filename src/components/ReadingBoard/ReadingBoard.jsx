import { useForm } from 'react-hook-form';
import css from './ReadingBoard.module.css';
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

function ReadingBoard() {
  const dispatch = useDispatch();

  const books = useSelector(selectRecomendedBooks);
  const book = useSelector(selectCurrentBook);

  const isLibraryModalOpen = useSelector(selectIsLibraryModalOpen);

  const ValidationSchema = yup.object().shape({
    pageNumber: yup
      .string()
      .matches(/^\d+$/, 'Only digits are allowed')
      .required('This field is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ValidationSchema),
  });

  function onSubmit(data) {
    console.log(data.pageNumber);

    // dispatch(
    //   addNewBook({
    //     title: data.bookTitle,
    //     author: data.author,
    //     totalPages: data.numberOfPages,
    //   })
    //     .unwrap()
    //     .then(() => {
    //       toast.success('The book was added successfully');
    //     })
    //     .catch(() => {
    //       toast.error('Error adding a book');
    //       return;
    //     })
    // );

    reset();
  }
  return (
    <div className={css.contentContainer}>
      <p className={css.pPage}>Start page:</p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputWrapper}>
          <label className={css.label} htmlFor="pageNumber">
            Page number:
          </label>
          <input
            className={clsx(css.pageNumber, css.input)}
            id="pageNumber"
            type="text"
            {...register('pageNumber')}
            placeholder="0"
          />
        </div>
        {errors.pageNumber && (
          <span className={css.errorSpan}>Only digits are allowed</span>
        )}

        <button className={css.toApplyBtn} type="submit">
          To start
        </button>
      </form>
      <p className={css.pProcess}>Progress</p>

      <p className={css.pText}>
        Here you will see when and how much you read. To record, click on the
        red button above.
      </p>
      <img
        className={css.noBooksIMG}
        src="/public/noReadingBooksMobile.webp"
        alt="noReadingBooksMobile"
      />

      {/* <div className={css.recomendedContainer}>
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
      </div> */}
      {isLibraryModalOpen && <AddToLibraryModal book={book} />}
    </div>
  );
}

export default ReadingBoard;
