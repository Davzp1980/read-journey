/* eslint-disable react/no-children-prop */

import { useSelector } from 'react-redux';
import DashBoard from '../../components/DashBoard/DashBoard';
import RecomendedBoard from '../../components/RecomendedBoard/RecomendedBoard';
import {
  selectCurrentBook,
  selectRecomendedBooks,
} from '../../redux/books/selectors';
import css from './RecommendedPage.module.css';
import { Grid } from 'swiper/modules';
import 'swiper/css/grid';
// import Swiper from 'swiper';
// import { SwiperSlide } from 'swiper/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import BookItem from '../../components/BookItem/BookItem';
import { useRef, useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import clsx from 'clsx';
import AddToLibraryModal from '../../components/AddToLibraryModal/AddToLibraryModal';
import {
  selectBookAuthor,
  selectBookTitle,
  selectIsLibraryModalOpen,
} from '../../redux/filters/selectors';
import { useMediaQuery } from 'react-responsive';

function RecommendedPage() {
  const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' });

  const books = useSelector(selectRecomendedBooks);

  const title = useSelector(selectBookTitle);
  const author = useSelector(selectBookAuthor);

  const filteredBooks = books.filter(
    book =>
      book.title.toLowerCase().includes(title?.toLowerCase()) &&
      book.author.toLowerCase().includes(author?.toLowerCase())
  );

  const book = useSelector(selectCurrentBook);

  const isLibraryModalOpen = useSelector(selectIsLibraryModalOpen);

  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className={css.recomendedContainer}>
      <DashBoard children={<RecomendedBoard />} />

      <div className={css.contentContainer}>
        <h2 className={css.h2}>Recommended</h2>

        <div className={css.sliderContainer}>
          <Swiper
            modules={[Grid]}
            spaceBetween={isBigScreen ? 25 : 21}
            slidesPerView={isBigScreen ? 4 : 2}
            onSwiper={swiper => {
              swiper => (swiperRef.current = swiper);
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={swiper => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            loop={false}
            grid={{
              rows: isBigScreen ? 2 : 1,
              fill: 'row',
            }}
          >
            {filteredBooks.map(book => (
              <SwiperSlide key={book._id}>
                <BookItem book={book} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={css.swiperBtn}>
          <button
            className={css.prevBtn}
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <IoChevronBack
              className={clsx(isBeginning ? css.prevSvg : css.iconWhite)}
            />
          </button>
          <button
            className={css.nextBtn}
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <IoChevronBack
              className={clsx(isEnd ? css.nextSvg : css.iconWhiteNext)}
            />
          </button>
        </div>
      </div>
      {isLibraryModalOpen && <AddToLibraryModal book={book} />}
    </div>
  );
}

export default RecommendedPage;
