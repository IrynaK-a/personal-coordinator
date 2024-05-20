/* eslint-disable max-len */
import cn from 'classnames';
import { StyledEngineProvider } from '@mui/material/styles';

import { HashLink } from 'react-router-hash-link';
import { LANDING_MENU_ITEMS } from '../../constants';

import styles from './AboutSection.module.scss';

type Props = {
  className?: string;
};

export const AboutSection: React.FC<Props> = ({ className }) => {
  return (
    <StyledEngineProvider injectFirst>
      <section
        id={LANDING_MENU_ITEMS.About}
        className={cn(styles.section, className)}
      >
        <h2 className={styles.sectionTitle}>About the Project</h2>

        <p className={styles.aboutText}>
          <span className={styles.styledName}>{`Personal coordinator `} </span>
          is an innovative e-learning platform that ensures accessible and effective education.
          Our platform is created to upgrade your studying experience and create a friendly and 
          modern study environment.
        </p>

        <h2 className={styles.subtitle}>
          <span className={styles.styledSubtitleText}>Experience </span> better
          learning
          <span className={styles.styledSubtitleText}> with AI</span>
        </h2>

        <HashLink
          smooth
          to={`#${LANDING_MENU_ITEMS.Home}`}
          className={styles.button}
        >
          Try it
        </HashLink>

        <h3 className={styles.quote}>
          “We
          <span className={styles.styledQuoteText}> envision</span> a world with
          <span className={styles.styledQuoteText}> no limits</span>”
        </h3>
      </section>
    </StyledEngineProvider>
  );
};
