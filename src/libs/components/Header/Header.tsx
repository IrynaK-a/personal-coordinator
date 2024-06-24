import cn from 'classnames';

import { Nav } from '../Nav';
import { LogoIcon } from '../Logo';

import styles from './Header.module.scss';

type Props = {
  className?: string;
};

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn(styles.header, className)}>
      <LogoIcon />

      <Nav />
    </header>
  );
};
