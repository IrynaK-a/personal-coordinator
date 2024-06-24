import { memo, useEffect } from 'react';
import { Loader, CourseCard } from '..';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DataStatus } from '../../types';
import * as coursesActions from '../../slices/coursesSlice';

import style from './CoursesSections.module.scss';

type Props = {
  showDefault?: boolean;
};

export const CoursesSections: React.FC<Props> = memo(
  ({ showDefault = false }) => {
    const dispatch = useAppDispatch();

    const { defaultCourses, coursesRequestStatus } = useAppSelector(
      state => state.courses,
    );
    const { aiCoursesRequestStatus, foundedCourses } = useAppSelector(
      state => state.ai,
    );

    const isCoursesLoading = showDefault
      ? coursesRequestStatus === DataStatus.PENDING
      : aiCoursesRequestStatus === DataStatus.PENDING;

    const courses = showDefault ? defaultCourses : foundedCourses;

    useEffect(() => {
      dispatch(coursesActions.getAllDefaultCourses());
    }, [dispatch]);

    return (
      <div className={style.courses}>
        <h2 className={style.title}>Courses</h2>

        <div className={style.cards}>
          {isCoursesLoading ? (
            <Loader />
          ) : (
            courses &&
            courses.map(course => (
              <CourseCard
                course={course}
                key={course.name}
              />
            ))
          )}
        </div>
      </div>
    );
  },
);
