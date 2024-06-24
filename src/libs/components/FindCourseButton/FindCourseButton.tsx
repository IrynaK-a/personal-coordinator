import LoadingButton from '@mui/lab/LoadingButton';
import { StyledEngineProvider } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute, DataStatus } from '../../types';
import { useAppSelector } from '../../app/hooks';

import styles from './FindCourseButton.module.scss';

type Props = {
  type: 'link' | 'button';
};

export const FindCourseButton: React.FC<Props> = ({ type }) => {
  const { aiCoursesRequestStatus } = useAppSelector(state => state.ai);
  const isLoading = aiCoursesRequestStatus === DataStatus.PENDING;
  const location = useLocation();

  if (type === 'link') {
    const isFindCoursePage = location.pathname === AppRoute.FIND_COURSES;

    const handleClick = () => {
      if (isFindCoursePage) {
        window.location.reload();
      }
    };

    return (
      <Link
        to={AppRoute.FIND_COURSES}
        className={styles.linkButton}
        onClick={handleClick}
      >
        Find course
      </Link>
    );
  }

  return (
    <StyledEngineProvider injectFirst>
      <LoadingButton
        loading={isLoading}
        variant="contained"
        type="submit"
        className={styles.submitButton}
      >
        <span>Find course</span>
      </LoadingButton>
    </StyledEngineProvider>
  );
};
