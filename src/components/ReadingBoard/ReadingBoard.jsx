import { useForm } from 'react-hook-form';
import css from './ReadingBoard.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';

import { useDispatch, useSelector } from 'react-redux';

import { addBookStartPage } from '../../redux/books/operations';
import toast from 'react-hot-toast';

import { selectCurrentBook } from '../../redux/books/selectors';

import AddToLibraryModal from '../AddToLibraryModal/AddToLibraryModal';
import { selectIsLibraryModalOpen } from '../../redux/filters/selectors';
import { setCurrentBook } from '../../redux/books/slice';

function ReadingBoard() {
  const dispatch = useDispatch();

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
    dispatch(
      addBookStartPage({
        id: book._id,
        page: data.pageNumber,
      })
    )
      .unwrap()
      .then(data => {
        dispatch(setCurrentBook(data));

        toast.success('The book`s start page number was successfully added');
      })
      .catch(() => {
        toast.error('Error adding a book`s page');
        return;
      });

    reset();
  }
  return (
    <div className={css.contentContainer}>
      <div className={css.readingBoardContainer}>
        <div>
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
        </div>
        <div>
          <p className={css.pProcess}>Progress</p>

          <p className={css.pText}>
            Here you will see when and how much you read. To record, click on
            the red button above.
          </p>
          <img
            className={css.noBooksIMG}
            src="/noReadingBooksMobile.webp"
            alt="noReadingBooksMobile"
          />

          {isLibraryModalOpen && <AddToLibraryModal book={book} />}
        </div>
      </div>
    </div>
  );
}

export default ReadingBoard;
