/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';

import { ICourse, TaskStatus } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import * as coursesActions from '../../slices/coursesSlice';
import { Loader } from '../Loader';
import styles from './MyCourseCard.module.scss';

type Props = {
  course: ICourse;
};

export const MyCourseCard: React.FC<Props> = ({ course }) => {
  const { courseTasks, startDate, id, name } = course;
  const dispatch = useAppDispatch();
  const hasTasks = Boolean(courseTasks.length);
  const date = new Date(startDate).toLocaleDateString('uk-UA');
  const [isDeleting, setIsDeliting] = useState(false);

  const handleDelete = async () => {
    setIsDeliting(true);
    await dispatch(coursesActions.deleteCourse(id));
    setIsDeliting(false);
  };

  const visibleTasks = courseTasks.slice(0, 2);

  return (
    <div className={styles.container}>
      {isDeleting ? (
        <Loader />
      ) : (
        <>
          <div className={styles.aboutSection}>
            <div className={styles.header}>
              <Link
                to={`${id}`}
                className={styles.title}
              >
                {name}
              </Link>

              <button
                type="button"
                className={styles.deleteButton}
                onClick={handleDelete}
              >
                <DeleteIcon className={styles.deleteIcon} />
              </button>
            </div>

            <span className={styles.startDay}>{date}</span>
          </div>

          <div className={styles.tasksSection}>
            <div className={styles.tasks}>
              {hasTasks && (
                <>
                  <p className={styles.subtitle}>Tasks:</p>

                  <ul className={styles.list}>
                    {visibleTasks.map(
                      ({ name: taskName, id: taskId, status }) => (
                        <li
                          className={styles.item}
                          key={taskId}
                        >
                          <input
                            id={String(taskId)}
                            name={taskName}
                            type="checkbox"
                            checked={status === TaskStatus.COMPLETED}
                            className={styles.input}
                            disabled
                          />
                          <label
                            htmlFor={String(taskId)}
                            className={styles.label}
                          >
                            {taskName}
                          </label>
                        </li>
                      ),
                    )}
                  </ul>
                </>
              )}
            </div>

            <Link
              to={`${id}`}
              className={styles.seeMoreLink}
            >
              See more
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
