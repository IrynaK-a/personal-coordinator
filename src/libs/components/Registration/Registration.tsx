import { StyledEngineProvider } from '@mui/material/styles';

import { useLocation, NavLink } from 'react-router-dom';

import { LANDING_MENU_ITEMS, REGISTRATION_PATH } from '../../constants';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegistrationForm } from '../RegistrationForm/RegistrationForm';

import styles from './Registration.module.scss';

type Props = {
  className?: string;
};

export const Registration: React.FC<Props> = ({ className }) => {
  const location = useLocation();
  const isRegistration = location.hash === `#${REGISTRATION_PATH.Register}`;

  return (
    <StyledEngineProvider injectFirst>
      <section
        id={LANDING_MENU_ITEMS.Home}
        className={(styles.section, className)}
      >
        <h1 className={styles.title}>Personal Coordinator</h1>

        <div className={styles.buttonGroup}>
          <NavLink
            to={`#${LANDING_MENU_ITEMS.Home}`}
            className={
              isRegistration ? styles.textButton : styles.textButtonActive
            }
          >
            Log in
          </NavLink>

          <NavLink
            to={`#${REGISTRATION_PATH.Register}`}
            className={
              isRegistration ? styles.textButtonActive : styles.textButton
            }
          >
            Sign up
          </NavLink>
        </div>

        {!isRegistration ? <LoginForm /> : <RegistrationForm />}
      </section>
    </StyledEngineProvider>
  );
};
