import { Link } from 'react-router-dom';
import cn from 'classnames';

import logo from '../../../assets/icons/logo.svg';

import styles from './Logo.module.scss';
import { AppRoute } from '../../types';

type LogoIconProps = {
  className?: string;
  linkTo?: string;
};

type LogoTextProps = {
  className?: string;
  linkTo?: string;
};

const handleClick = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const LogoIcon: React.FC<LogoIconProps> = ({
  className,
  linkTo = AppRoute.ROOT,
}) => {
  return (
    <Link
      to={linkTo}
      className={cn(styles.logoIcon, className)}
      onClick={handleClick}
    >
      <img
        className={styles.logoImage}
        src={logo}
        alt="logo"
      />
    </Link>
  );
};

export const LogoText: React.FC<LogoTextProps> = ({
  className,
  linkTo = AppRoute.ROOT,
}) => {
  return (
    <Link
      to={linkTo}
      className={cn(styles.logoTextLink, className)}
      onClick={handleClick}
    >
      <h1 className={styles.logoText}>Personal Coordinator</h1>
    </Link>
  );
};
