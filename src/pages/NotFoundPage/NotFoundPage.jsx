import { useNavigate } from 'react-router';
import css from './NotFoundPage.module.css';

function NotFoundPage() {
  const navigate = useNavigate();

  function handleHome() {
    navigate('/');
  }
  return (
    <div>
      <h1 className={css.h1}>Not found</h1>
      <p className={css.p}>The request URL/404 was not found on this server</p>
      <p className={css.p}>
        Additionally, a 404 Nor Found error was encountered while trying to use
        an ErrorDocument to handle the request.
      </p>
      <button className={css.button} onClick={handleHome}>
        Home Page
      </button>
    </div>
  );
}

export default NotFoundPage;
