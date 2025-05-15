import { useForm } from 'react-hook-form';
import css from './StopReadingBoard.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';

import { useDispatch, useSelector } from 'react-redux';

import { addBookEndPage } from '../../redux/books/operations';
import toast from 'react-hot-toast';

import { selectCurrentBook } from '../../redux/books/selectors';

import AddToLibraryModal from '../AddToLibraryModal/AddToLibraryModal';
import { selectIsLibraryModalOpen } from '../../redux/filters/selectors';
import { setCurrentBook, setTimeData } from '../../redux/books/slice';
import { Circle } from 'rc-progress';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

function StopReadingBoard() {
  const dispatch = useDispatch();

  const book = useSelector(selectCurrentBook);

  const [percent, setPercent] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const isLibraryModalOpen = useSelector(selectIsLibraryModalOpen);
  const isPCScreen = useMediaQuery({ query: '(min-width: 1440px)' });

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
    console.log(book);

    dispatch(
      addBookEndPage({
        id: book._id,
        page: Number(data.pageNumber),
      })
    )
      .unwrap()
      .then(data => {
        const lastArrItem =
          data.progress.length > 0
            ? data.progress[data.progress.length - 1]
            : null;

        dispatch(setTimeData(data.timeLeftToRead));

        setPercent((lastArrItem.finishPage / data.totalPages) * 100);
        setLastPage(lastArrItem.finishPage);

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
          <p className={css.pPage}>Stop page:</p>

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
              To stop
            </button>
          </form>
        </div>
        <div>
          <p className={css.pStatistics}>Statistics</p>

          {isPCScreen && (
            <p className={css.pAfterStatistic}>
              Each page, each chapter is a new round of knowledge, a new step
              towards understanding. By rewriting statistics, we create our own
              reading history.
            </p>
          )}

          <div className={css.statisticsDiv}>
            <div className={css.circleDiv}>
              <p className={css.percent}>100%</p>
              <Circle
                percent={percent}
                strokeWidth={11}
                strokeColor="#30b94d"
                trailWidth={11}
                trailColor="#1f1f1f"
              />
            </div>
            <div className={css.percentPages}>
              <div className={css.greenSquare}></div>
              <div className={css.pagesRead}>
                <p className={css.pPercent}>{Math.round(percent)}%</p>
                <p className={css.pPages}>{lastPage} pages read</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLibraryModalOpen && <AddToLibraryModal book={book} />}
    </div>
  );
}

export default StopReadingBoard;
