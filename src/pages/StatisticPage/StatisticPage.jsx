/* eslint-disable react/no-children-prop */
import { useDispatch, useSelector } from 'react-redux';
import DashBoard from '../../components/DashBoard/DashBoard';

import css from './StatisticPage.module.css';
import { selectCurrentBook } from '../../redux/books/selectors';
import { getUsersBooks } from '../../redux/books/operations';
import { useEffect } from 'react';

import StopReadingBoard from '../../components/StopReadingBoard/StopReadingBoard';
import ReadingBookCurrent from '../../components/ReadingBookCurrent/ReadingBookCurrent';
import { useNavigate } from 'react-router';

function StatisticPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const currentBook = useSelector(selectCurrentBook);

  function handleOnClick() {
    navigate('/reading');
  }

  useEffect(() => {
    dispatch(getUsersBooks());
  }, [dispatch]);

  return (
    <div className={css.statisticContainer}>
      <DashBoard children={<StopReadingBoard />} />

      <div className={css.ReadingContainer}>
        <div className={css.myReadingDiv}>
          <h2 className={css.myReadingH2}>My reading</h2>
        </div>

        <div className={css.ReadingBookCurrent}>
          <ReadingBookCurrent book={currentBook} />
        </div>
        <button className={css.btn} type="button" onClick={handleOnClick}>
          <div className={css.whiteCircle}>
            <div className={css.redCircle}></div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default StatisticPage;
