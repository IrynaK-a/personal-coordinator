/* eslint-disable max-len */
import { useMemo } from 'react';
import cn from 'classnames';
import { ReactComponent as ScaleIcon } from '../../../assets/icons/upscale-spark.svg';
import { ReactComponent as SadIcon } from '../../../assets/icons/formkit_sad.svg';
import { useAppSelector } from '../../app/hooks';
import { FIND_COURSES_DEFAULT_MESSSAGE } from '../../constants';

import styles from './FindCourseMessageContainer.module.scss';

export const FindCourseMessageContainer = () => {
  const { aiCoursesRequestStatus } = useAppSelector(state => state.ai);

  const title = useMemo(() => {
    switch (aiCoursesRequestStatus) {
      case 'fulfilled':
        return FIND_COURSES_DEFAULT_MESSSAGE.success.title;
      case 'rejected':
        return FIND_COURSES_DEFAULT_MESSSAGE.failure.title;
      default:
        return FIND_COURSES_DEFAULT_MESSSAGE.default.title;
    }
  }, [aiCoursesRequestStatus]);

  const message = useMemo(() => {
    switch (aiCoursesRequestStatus) {
      case 'fulfilled':
        return FIND_COURSES_DEFAULT_MESSSAGE.success.message;
      case 'rejected':
        return FIND_COURSES_DEFAULT_MESSSAGE.failure.message;
      default:
        return FIND_COURSES_DEFAULT_MESSSAGE.default.message;
    }
  }, [aiCoursesRequestStatus]);

  const hasError = aiCoursesRequestStatus === 'rejected';

  return (
    <div
      className={cn(styles.messageContainer, {
        [styles.errorContainer]: hasError,
      })}
    >
      <div className={styles.titleContainer}>
        <h2
          className={cn(styles.title, {
            [styles.errorTitle]: hasError,
          })}
        >
          {title}
        </h2>

        {hasError ? (
          <SadIcon className={styles.icon} />
        ) : (
          <ScaleIcon className={styles.icon} />
        )}
      </div>

      <div className={styles.message}>{message}</div>
    </div>
  );
};
