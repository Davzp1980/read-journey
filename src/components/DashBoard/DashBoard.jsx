/* eslint-disable react/prop-types */
import css from './DashBoard.module.css';

function DashBoard({ children }) {
  return (
    <div className={css.container}>
      <div className={css.contentContainer}>{children}</div>
    </div>
  );
}

export default DashBoard;
