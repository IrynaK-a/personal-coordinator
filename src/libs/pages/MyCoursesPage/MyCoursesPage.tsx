import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader, MyCourseCard } from '../../components';
import * as coursesActions from '../../slices/coursesSlice';
import { AppRoute, DataStatus } from '../../types';

import styles from './MyCoursesPage.module.scss';

export const MyCoursesPage = () => {
  const dispatch = useAppDispatch();
  const { myCourses, coursesRequestStatus } = useAppSelector(
    state => state.courses,
  );

  const isLoading = coursesRequestStatus === DataStatus.PENDING;
  const hasNoCourses = (!myCourses || myCourses.length === 0) && !isLoading;
  const hasCourses = !isLoading && !hasNoCourses && !!myCourses;

  useEffect(() => {
    dispatch(coursesActions.getAllMyCourses());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}

      {hasCourses &&
        myCourses.map(course => (
          <MyCourseCard
            course={course}
            key={course.id}
          />
        ))}

      {hasNoCourses && (
        <div className={styles.noCoursesSection}>
          <Link
            to={AppRoute.CREATE_COURSE}
            className={styles.createCourseLink}
          >
            Create course
          </Link>
        </div>
      )}
    </div>
  );
};
