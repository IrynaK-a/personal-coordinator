/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  CoursesSections,
  FindCourseButton,
  FindCourseForm,
  FindCourseMessageContainer,
} from '../../components';
import { DataStatus } from '../../types';
import * as aiActions from '../../slices/aiSlice';

import styles from './FindCoursePage.module.scss';

export const FindCoursePage = () => {
  const dispatch = useAppDispatch();
  const { aiCoursesRequestStatus, foundedCourses } = useAppSelector(
    state => state.ai,
  );

  const hasFoundedCourses = Boolean(foundedCourses?.length);
  const hasError =
    aiCoursesRequestStatus === DataStatus.REJECTED ||
    (aiCoursesRequestStatus === DataStatus.FULFILLED && !hasFoundedCourses);
  const hasFormShown =
    aiCoursesRequestStatus !== DataStatus.FULFILLED &&
    aiCoursesRequestStatus !== DataStatus.REJECTED;

  useEffect(() => {
    return () => {
      dispatch(aiActions.actions.setNoFoundedCourses());
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <FindCourseMessageContainer />

      {hasFormShown && <FindCourseForm />}

      {hasFoundedCourses && <CoursesSections />}

      {hasError && (
        <>
          <FindCourseButton type="link" />
          <CoursesSections showDefault />
        </>
      )}
    </div>
  );
};
