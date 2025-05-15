import { Link, NavLink } from 'react-router';
import css from './Header.module.css';
import { setIsModalOpen } from '../../redux/filters/slice';
import { useDispatch, useSelector } from 'react-redux';
import ModalWindow from '../ModalWindow/ModalWindow';
import { selectIsModalOpen } from '../../redux/filters/selectors';
import clsx from 'clsx';
import { logOut } from '../../redux/auth/operations';
import { useMediaQuery } from 'react-responsive';
import { selectUser } from '../../redux/auth/selectors';

function Header() {
  const isTabletScreen = useMediaQuery({ query: '(min-width: 768px)' });
  const isPCScreen = useMediaQuery({ query: '(min-width: 1440px)' });
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);

  const user = useSelector(selectUser);

  function onClickBurger() {
    dispatch(setIsModalOpen(true));
  }

  function logout() {
    dispatch(logOut());
  }

  function activeLink({ isActive }) {
    return clsx(css.link, isActive && css.active);
  }
  return (
    <div className={css.container}>
      <div className={css.contentContainer}>
        <div className={css.logoDiv}>
          <Link to="/">
            <img src="/img/Logo_mobile.webp" alt="logo" />
          </Link>
          {isPCScreen && <p className={css.logoText}>read journey</p>}
        </div>
        {isTabletScreen && (
          <div className={css.navLinks}>
            <NavLink className={activeLink} to="/">
              Home
            </NavLink>
            <NavLink className={activeLink} to="/library">
              My library
            </NavLink>
          </div>
        )}

        <div className={css.logoutBurger}>
          <Link to="/library">
            <svg className={css.logoutSVG}>
              <use href="/sprite.svg#logout"></use>
            </svg>
          </Link>
          {isPCScreen && <p className={css.logoText}>{user.name}</p>}

          {isTabletScreen && (
            <button className={css.logoutBtn} type="button" onClick={logout}>
              Log out
            </button>
          )}
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
