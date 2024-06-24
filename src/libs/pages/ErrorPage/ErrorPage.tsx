import { useNavigate } from 'react-router';
import { AppRoute } from '../../types';
import errorIcon from '../../../assets/icons/error.svg';

import styles from './ErrorPage.module.scss';

type Props = {
  isNotFoundPage?: boolean;
};

export const ErrorPage: React.FC<Props> = ({ isNotFoundPage = false }) => {
  const navigate = useNavigate();

  const message = isNotFoundPage
    ? `Page not found`
    : `Something went wrong. Try refresh page`;

  const buttonText = isNotFoundPage ? `Go home` : `Refresh Page`;

  const handleClick = () => {
    navigate(AppRoute.HOME);

    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <img
        alt="Page not found"
        src={errorIcon}
        className={styles.icon}
      />

      <p className={styles.message}>{message}</p>

      <button
        type="button"
        className={styles.button}
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
};
