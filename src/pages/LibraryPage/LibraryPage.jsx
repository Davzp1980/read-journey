/* eslint-disable react/no-children-prop */
import { useDispatch, useSelector } from 'react-redux';
import DashBoard from '../../components/DashBoard/DashBoard';
import LibraryBoard from '../../components/LibraryBoard/LibraryBoard';
import css from './LibraryPage.module.css';
import { selectFavoriteBooks } from '../../redux/books/selectors';
import { getUsersBooks } from '../../redux/books/operations';
import { useEffect, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

import { Swiper, SwiperSlide } from 'swiper/react';

import BookItemMyLibrary from '../../components/BookItemMyLibrary/BookItemMyLibrary';

function LibraryPage() {
  const dispatch = useDispatch();
  const myBooks = useSelector(selectFavoriteBooks);

  const options = [
    { name: 'Unread', value: 'unread' },
    { name: 'In progress', value: 'inProgress' },
    { name: 'Done', value: 'done' },
    { name: 'All books', value: 'allBooks' },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('All books');
  const [selectedValue, setSelectedValue] = useState('allBooks');

  const filteredMyBooks = myBooks.filter(book => {
    if (selectedValue === 'allBooks') {
      return myBooks;
    } else {
      return book.status === selectedValue;
    }
  });

  const handleSelect = option => {
    setSelected(option.name);
    setSelectedValue(option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(getUsersBooks());
  }, [dispatch]);

  return (
    <div>
      <div className={css.libraryContainer}>
        <DashBoard children={<LibraryBoard />} />

        <div className={css.myLibraryContainer}>
          <div className={css.h2AndMenu}>
            <h2 className={css.myLibraryH2}>My library</h2>
            <div className={css.selectContainer}>
              <div className={css.selected} onClick={() => setIsOpen(!isOpen)}>
                {selected} <IoChevronDown className={css.icon} />
              </div>
              {isOpen && (
                <div className={css.options}>
                  {options.map(option => (
                    <div
                      key={option.name}
                      className={`${css.option} ${
                        option === selected ? css.selectedOption : ''
                      }`}
                      onClick={() => handleSelect(option)}
                    >
                      {option.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {filteredMyBooks.length < 1 && (
            <div className={css.noBooksDiv}>
              <div className={css.imgDiv}>
                <img
                  className={css.booksImg}
                  src="/img/books_mobile.webp"
                  alt="books"
                />
              </div>
              <p className={css.booksP}>
                To start training, add{' '}
                <span className={css.span}>some of your books</span> or from the
                recommended ones
              </p>
            </div>
          )}

          {myBooks.length > 0 && (
            <div className={css.swiperContainer}>
              <Swiper spaceBetween={20} slidesPerView={4}>
                {filteredMyBooks?.map(book => (
                  <SwiperSlide key={book._id}>
                    <BookItemMyLibrary book={book} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LibraryPage;
