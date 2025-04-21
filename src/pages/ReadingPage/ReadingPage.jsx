/* eslint-disable react/no-children-prop */
import { useSelector } from 'react-redux';
import DashBoard from '../../components/DashBoard/DashBoard';
import ReadingBoard from '../../components/ReadingBoard/ReadingBoard';
import css from './ReadingPage.module.css';
import { selectCurrentBook } from '../../redux/books/selectors';
import ReadingBookCurrent from '../../components/ReadingBookCurrent/ReadingBookCurrent';

function ReadingPage() {
  const currentBook = useSelector(selectCurrentBook);

  // console.log(currentBook);

  return (
    <div>
      <DashBoard children={<ReadingBoard />} />
      <div className={css.ReadingContainer}>
        <h2 className={css.myReadingH2}>My reading</h2>
        <div className={css.ReadingBookCurrent}>
          <ReadingBookCurrent book={currentBook} />
        </div>
        <button className={css.btn} type="button">
          <div className={css.whiteCircle}>
            <div className={css.redCircle}></div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ReadingPage;
