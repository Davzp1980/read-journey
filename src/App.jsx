import { lazy, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRouter';
import RecommendedPage from './pages/Recommended/RecommendedPage';
import { Toaster } from 'react-hot-toast';
import { refreshUser } from './redux/auth/operations';
import { useDispatch } from 'react-redux';
import { getBooksRecommend } from './redux/books/operations';
import LibraryPage from './pages/LibraryPage/LibraryPage';
import ReadingPage from './pages/ReadingPage/ReadingPage';

const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));

// const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(getBooksRecommend());
  }, [dispatch]);
  return (
    <>
      <main>
        <div className="container">
          <Layout>
            <Routes>
              <Route
                path="/register"
                element={
                  <RestrictedRoute
                    redirectTo="/recommended"
                    component={<RegisterPage />}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <RestrictedRoute
                    redirectTo="/recommended"
                    component={<LoginPage />}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <PrivateRoute
                    redirectTo="/login"
                    component={<RecommendedPage />}
                  />
                }
              />
              <Route
                path="/recommended"
                element={
                  <PrivateRoute
                    redirectTo="/login"
                    component={<RecommendedPage />}
                  />
                }
              />
              <Route
                path="/library"
                element={
                  <PrivateRoute
                    redirectTo="/login"
                    component={<LibraryPage />}
                  />
                }
              />

              <Route
                path="/reading"
                element={
                  <PrivateRoute
                    redirectTo="/login"
                    component={<ReadingPage />}
                  />
                }
              />

              {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
          </Layout>
        </div>
        {/* {isModalOpen && <ModalWindow />} */}
      </main>
      <Toaster />
    </>
  );
}

export default App;
