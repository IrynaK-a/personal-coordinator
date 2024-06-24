import { useEffect } from 'react';
import { useParams } from 'react-router';
import cn from 'classnames';

import { ReactComponent as TasksIcon } from '../../../assets/icons/tasks.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  AboutCourseSection,
  CreateTaskBar,
  Loader,
  TasksContainer,
} from '../../components';
import { DataStatus } from '../../types';
import * as coursesActions from '../../slices/coursesSlice';
import * as tasksActions from '../../slices/tasksSlice';

import styles from './CoursePage.module.scss';

export const CoursePage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { currentCourse, currentCoursesRequestStatus } = useAppSelector(
    state => state.courses,
  );

  const isCourseLoading = currentCoursesRequestStatus === DataStatus.PENDING;
  const hasCurrentCourse = !isCourseLoading && currentCourse;

  useEffect(() => {
    if (id && !currentCourse) {
      dispatch(coursesActions.getCurrent(+id));
    }
  }, [dispatch, id, currentCourse]);

  useEffect(
    () => () => {
      dispatch(coursesActions.actions.setNoCurrentCourse());
      dispatch(tasksActions.actions.setNoCurrentTasks());
    },
    [dispatch],
  );

  return (
    <div className={styles.container}>
      {isCourseLoading && <Loader />}
      {hasCurrentCourse && (
        <>
          <div className={styles.mainInfo}>
            <AboutCourseSection course={currentCourse} />
          </div>

          <CreateTaskBar />

          <section className={styles.tasksSection}>
            <div className={styles.tasksTitleSection}>
              {currentCourse.image && (
                <img
                  src={currentCourse.image}
                  alt={currentCourse.name}
                  className={styles.courseImage}
                />
              )}

              <TasksIcon
                className={cn(styles.tasksTitleIcon, {
                  [styles.tasksTitleIconMobile]: currentCourse.image,
                })}
              />

              <h3 className={styles.tasksTitle}>Tasks</h3>
            </div>

            <TasksContainer />
          </section>
        </>
      )}
    </div>
  );
};
