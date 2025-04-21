import { Link } from 'react-router';
import css from './Header.module.css';
import { setIsModalOpen } from '../../redux/filters/slice';
import { useDispatch, useSelector } from 'react-redux';
import ModalWindow from '../ModalWindow/ModalWindow';
import { selectIsModalOpen } from '../../redux/filters/selectors';

function Header() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);

  function onClickBurger() {
    dispatch(setIsModalOpen(true));
  }
  return (
    <div className={css.container}>
      <div className={css.contentContainer}>
        <Link to="/">
          <img src="/img/Logo_mobile.webp" alt="logo" />
        </Link>

        <div className={css.logoutBurger}>
          <Link to="/library">
            <svg className={css.logoutSVG}>
              <use href="/sprite.svg#logout"></use>
            </svg>
          </Link>
          <button className={css.btn} type="button" onClick={onClickBurger}>
            <svg className={css.logoutSVG}>
              <use href="/sprite.svg#burger"></use>
            </svg>
          </button>
        </div>
      </div>
      {isModalOpen && <ModalWindow />}
    </div>
  );
}

export default Header;
