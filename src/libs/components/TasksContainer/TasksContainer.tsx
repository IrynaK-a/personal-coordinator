import { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../Todo';
import { sortTasks } from '../../utils/sortTasks';

import styles from './TasksContainer.module.scss';

export const TasksContainer = () => {
  const { currentCourse } = useAppSelector(state => state.courses);
  const { currentTasks } = useAppSelector(state => state.tasks);

  const hasCourses = !!currentCourse && !!currentTasks.length;
  const sortedTasks = useMemo(() => sortTasks(currentTasks), [currentTasks]);

  return (
    <div className={styles.tasksContainer}>
      {hasCourses ? (
        sortedTasks.map(task => (
          <Todo
            task={task}
            key={task.id}
            currentCourseId={currentCourse.id}
          />
        ))
      ) : (
        <p className={styles.noTasksInfo}>There are no tasks yet</p>
      )}
    </div>
  );
};
