import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UpdatedTaskData, ICourseTask, TaskStatus } from '../../types';

import { useAppDispatch } from '../../app/hooks';
import * as tasksAction from '../../slices/tasksSlice';
import styles from './Todo.module.scss';

type Props = {
  task: ICourseTask;
  currentCourseId: number;
};

export const Todo: React.FC<Props> = ({
  task: { id, status, name },
  currentCourseId,
}) => {
  const dispatch = useAppDispatch();
  const [isUpdatingTodoTitle, setIsUpdatingTodoTitle] = useState(false);

  const toggleChecked = async () => {
    await dispatch(
      tasksAction.updateCurrentTask({
        status:
          status === TaskStatus.COMPLETED
            ? TaskStatus.IN_PROGRESS
            : TaskStatus.COMPLETED,
        name,
        id,
      }),
    );
  };

  const { handleSubmit, register } = useForm<UpdatedTaskData>();

  const onSubmit = async (updatedTask: UpdatedTaskData) => {
    if (!updatedTask.name.trim()) {
      setIsUpdatingTodoTitle(false);
      return;
    }

    await dispatch(
      tasksAction.updateCurrentTask({
        status,
        name: updatedTask.name.trim(),
        id,
      }),
    );

    setIsUpdatingTodoTitle(false);
  };

  const deleteCurrentTodo = () => {
    dispatch(
      tasksAction.deleteCurrentTask({
        id,
        courseId: currentCourseId,
      }),
    );
  };

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={status === TaskStatus.COMPLETED}
        onChange={toggleChecked}
      />

      {isUpdatingTodoTitle ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          onBlur={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            className={styles.input}
            {...register('name')}
          />
        </form>
      ) : (
        <>
          <span
            onDoubleClick={() => setIsUpdatingTodoTitle(true)}
            className={styles.taskName}
          >
            {name}
          </span>

          <button
            type="button"
            className={styles.deleteButton}
            onClick={deleteCurrentTodo}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
