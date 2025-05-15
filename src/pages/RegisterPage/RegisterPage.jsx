import { Link } from 'react-router';
import css from './RegisterPage.module.css';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import { getBooksRecommend } from '../../redux/books/operations';

function RegisterPage() {
  const [isEyeOn, setIsEyeOn] = useState(true);
  const [isIconHidden, setIsIconHidden] = useState(true);
  const dispatch = useDispatch();

  function clickOnEye() {
    setIsEyeOn(prev => !prev);
  }

  const ValidationSchema = yup.object().shape({
    name: yup.string().required('Must be filled in'),
    email: yup
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

  const passwordValue = watch('password');

  function onSubmit(data) {
    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        dispatch(getBooksRecommend());
        toast.success('Registration was successful');
      })
      .catch(() => {
        toast.error('Registration error user already exists');
        return;
      });

    reset();
  }

  function onClickRegistration() {
    if (errors.password) {
      setIsIconHidden(prev => !prev);
    } else {
      setIsIconHidden(prev => !prev);
    }
  }

  return (
    <div className={css.registerContainer}>
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
            <label className={css.label} htmlFor="name">
              Name:
            </label>
            <input
              className={clsx(
                errors.name && css.inputError,
                css.inputName,
                css.input
              )}
              type="text"
              id="name"
              {...register('name')}
              placeholder="Ilona Ratushniak"
            />
          </div>
          {errors.name && <span className={css.errorSpan}>Enter a name*</span>}

          <div className={css.inputWrapper}>
            <label className={css.label} htmlFor="email">
              Mail:
            </label>
            <input
              className={clsx(
                errors.email && css.inputError,
                css.inputEmail,
                css.input
              )}
              id="email"
              type="text"
              {...register('email')}
              placeholder="Your@email.com"
            />
          </div>
          {errors.email && (
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
              Registration
            </button>
            <Link className={css.loginLink} to="/login">
              Already have an account?
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

export default RegisterPage;
