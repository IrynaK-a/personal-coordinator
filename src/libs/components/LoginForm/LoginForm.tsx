import { StyledEngineProvider } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router';
import { AppRoute, ISignInFormData } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signInSchema } from '../../validationSchemas/signInSchema';
import * as authActions from '../../slices/authSlice';

import styles from './LoginForm.module.scss';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authRequestStatus, user } = useAppSelector(state => state.auth);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ISignInFormData>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async ({ email, password }: ISignInFormData) => {
    await dispatch(authActions.signIn({ email, password }));

    if (user) {
      navigate(AppRoute.HOME);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="email"
          className={styles.input}
          placeholder="Enter your email"
          {...register('email')}
        />
        <p className={styles.error}>{errors.email?.message}</p>

        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          {...register('password')}
        />
        <p className={styles.error}>{errors.password?.message}</p>

        <LoadingButton
          loading={authRequestStatus === 'pending'}
          variant="contained"
          type="submit"
          className={styles.submitButton}
        >
          <span>Log in</span>
        </LoadingButton>
      </form>
    </StyledEngineProvider>
  );
};
