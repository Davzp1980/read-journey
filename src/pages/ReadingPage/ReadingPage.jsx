/* eslint-disable react/no-children-prop */
import { useSelector } from 'react-redux';
import DashBoard from '../../components/DashBoard/DashBoard';
import ReadingBoard from '../../components/ReadingBoard/ReadingBoard';
import css from './ReadingPage.module.css';
import { selectCurrentBook } from '../../redux/books/selectors';
import ReadingBookCurrent from '../../components/ReadingBookCurrent/ReadingBookCurrent';
import { useNavigate } from 'react-router';

function ReadingPage() {
  const navigate = useNavigate();
  const currentBook = useSelector(selectCurrentBook);

  function handleOnClick() {
    navigate('/statistic');
  }

  return (
    <div className={css.readingPageContainer}>
      <DashBoard children={<ReadingBoard />} />
      <div className={css.ReadingContainer}>
        <h2 className={css.myReadingH2}>My reading</h2>
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

export default ReadingPage;
