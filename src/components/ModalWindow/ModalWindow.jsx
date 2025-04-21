import { NavLink } from 'react-router';
import css from './ModalWindow.module.css';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { setIsModalOpen } from '../../redux/filters/slice';
import { logOut } from '../../redux/auth/operations';
import { disableScroll, enableScroll } from '../utils';

function ModalWindow() {
  const dispatch = useDispatch();
  disableScroll();
  function activeLink({ isActive }) {
    return clsx(css.link, isActive && css.active);
  }

  function onClickClose() {
    enableScroll();
    dispatch(setIsModalOpen(false));
  }

  function logout() {
    dispatch(logOut());
  }
  return (
    <div className={css.container}>
      <div className={css.navLinks}>
        <NavLink className={activeLink} to="/">
          Home
        </NavLink>
        <NavLink className={activeLink} to="/library">
          My library
        </NavLink>
      </div>
      <button className={css.logoutBtn} type="button" onClick={logout}>
        Log out
      </button>
      <button className={css.closeBtn} type="button" onClick={onClickClose}>
        <svg className={css.closeSvg}>
          <use href="/public/sprite.svg#close"></use>
        </svg>
      </button>
    </div>
  );
}

export default ModalWindow;
