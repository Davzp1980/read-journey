import { Link } from 'react-router';
import css from './LoginPage.module.css';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import { getBooksRecommend } from '../../redux/books/operations';

function LoginPage() {
  const [isEyeOn, setIsEyeOn] = useState(true);
  const [isIconHidden, setIsIconHidden] = useState(true);
  const dispatch = useDispatch();

  function clickOnEye() {
    setIsEyeOn(prev => !prev);
  }

  const ValidationSchema = yup.object().shape({
    mail: yup
      .string()
      .email()
      .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      .required('Must be filled in'),
    password: yup.string().min(7).required(),
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm({ resolver: yupResolver(ValidationSchema) });

  function onSubmit(data) {
    dispatch(
      logIn({
        email: data.mail,
        password: data.password,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getBooksRecommend());
        toast.success('Login was successful');
      })
      .catch(() => {
        toast.error('Login error');
        return;
      });
    reset();
  }

  const passwordValue = watch('password');

  function onClickRegistration() {
    if (errors.password) {
      setIsIconHidden(prev => !prev);
    }
    if (!errors.password) {
      setIsIconHidden(prev => !prev);
    }
  }

  return (
    <div className={css.loginContainer}>
      <div className={css.contentContainer}>
        <div className={css.logoDiv}>
          <Link to="/">
            <img className={css.logo} src="/img/Logo_mobile.webp" alt="logo" />
          </Link>
          <p className={css.logoText}>read journey</p>
        </div>
        <h1 className={css.h1}>
          Expand your mind, reading <span className={css.span}>a book</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.inputWrapper}>
            <label className={css.label} htmlFor="mail">
              Mail:
            </label>
            <input
              className={clsx(
                errors.mail && css.inputError,
                css.inputEmail,
                css.input
              )}
              id="mail"
              type="text"
              {...register('mail')}
              placeholder="Your@email.com"
            />
          </div>
          {errors.mail && (
            <span className={css.errorSpan}>Enter a valid email*</span>
          )}
          <div className={css.inputWrapper}>
            <label className={css.label} htmlFor="password">
              Password:
            </label>
            <input
              className={clsx(
                css.inputPassword,
                css.inputPassword,
                passwordValue?.length > 7 ? css.inputOk : '',
                errors.password ? css.inputPasswordError : ''
              )}
              id="password"
              type={isEyeOn ? 'text' : 'password'}
              {...register('password')}
              placeholder="Yourpasswordhere"
            />
            <button
              className={css.passwordBtn}
              type="button"
              onClick={clickOnEye}
            >
              {isEyeOn ? (
                <svg className={clsx(!isIconHidden ? css.svgHidden : css.svg)}>
                  <use href="sprite.svg#eye"></use>
                </svg>
              ) : (
                <svg className={clsx(!isIconHidden ? css.svgHidden : css.svg)}>
                  <use href="sprite.svg#eye-off"></use>
                </svg>
              )}
            </button>
            {errors.password ? (
              <svg
                className={clsx(isIconHidden ? css.svgHidden : css.svgOkError)}
              >
                <use href="sprite.svg#pajamas_error"></use>
              </svg>
            ) : (
              <svg
                className={clsx(isIconHidden ? css.svgHidden : css.svgOkError)}
              >
                <use href="sprite.svg#check-ok"></use>
              </svg>
            )}
          </div>
          {errors.password && (
            <span className={css.errorSpan}>Enter a valid password*</span>
          )}

          {passwordValue?.length > 7 ? (
            <span className={css.okSpan}>Password is secure</span>
          ) : (
            ''
          )}

          <div className={css.btnDiv}>
            <button
              className={css.submitBtn}
              type="submit"
              onClick={onClickRegistration}
            >
              Log in
            </button>
            <Link className={css.loginLink} to="/register">
              Don&apos;t have an account?
            </Link>
          </div>
        </form>
      </div>
      <div className={css.photoContainer}>
        <picture>
          <source
            srcSet="/img/iPhone_15_Black_PC.webp"
            media="(min-width: 1440px)"
          />

          <img src="/img/iPhone-15-Black-1.webp" alt="iPhone-15" />
        </picture>
      </div>
    </div>
  );
}

export default LoginPage;
