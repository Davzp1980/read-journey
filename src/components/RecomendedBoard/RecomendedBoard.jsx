import { useForm } from 'react-hook-form';
import css from './RecomendedBoard.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { setBookAuthor, setBookTitle } from '../../redux/filters/slice';

function RecomendedBoard() {
  const dispatch = useDispatch();

  const ValidationSchema = yup.object().shape({
    bookTitle: yup.string(),

    author: yup.string(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(ValidationSchema),
  });

  function onSubmit(data) {
    dispatch(setBookTitle(data.bookTitle));
    dispatch(setBookAuthor(data.author));
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
            placeholder="Enter text"
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
            placeholder="Enter text"
          />
        </div>
        <button className={css.toApplyBtn} type="submit">
          To apply
        </button>
      </form>
      <div className={css.workoutDiv}>
        <p className={css.workoutP}>Start your workout</p>
        <div className={css.div1}>
          <div className={css.img}>
            <img src="/img/1.webp" alt="1" />
          </div>
          <p className={css.p1}>
            <span className={css.span}>Create a personal library:</span> add the
            books you intend to read to it.
          </p>
        </div>
        <div className={css.div2}>
          <div className={css.img}>
            <img src="/img/2.webp" alt="2" />
          </div>
          <p className={css.p2}>
            <span className={css.span}>Create your first workout:</span> define
            a goal, choose a period, start training.
          </p>
        </div>
        <div className={css.libraryDiv}>
          <Link className={css.link} to="/library">
            My library
          </Link>
          <button className={css.arrowBtn} type="button">
            <svg className={css.svg}>
              <use href="/sprite.svg#log-in"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecomendedBoard;
