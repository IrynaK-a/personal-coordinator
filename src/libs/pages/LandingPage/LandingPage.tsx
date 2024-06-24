import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  AboutSection,
  ContactsSection,
  Footer,
  Header,
  Registration,
} from '../../components';
import { useAppSelector } from '../../app/hooks';
import { DataStatus } from '../../types';
import { NOTIFICATION_MESSAGES } from '../../constants';

import styles from './LandingPage.module.scss';

export const LandingPage = () => {
  const location = useLocation();
  const { authRequestStatus } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [location.hash]);

  useEffect(() => {
    if (authRequestStatus === DataStatus.REJECTED) {
      toast.error(NOTIFICATION_MESSAGES.auth.error);
    }
  }, [authRequestStatus]);

  return (
    <>
      <Header className={styles.header} />

      <div className={styles.mainContainer}>
        <main className={styles.mainContent}>
          <Registration className={styles.registrationSection} />

          <AboutSection className={styles.aboutSection} />

          <ContactsSection />
        </main>
      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
};
