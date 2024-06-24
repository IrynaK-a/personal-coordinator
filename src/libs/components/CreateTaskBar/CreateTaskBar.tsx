import { useState } from 'react';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CreateTaskData } from '../../types';
import * as tasksActions from '../../slices/tasksSlice';

import styles from './CreateTaskBar.module.scss';

export const CreateTaskBar = () => {
  const dispatch = useAppDispatch();
  const { currentCourse } = useAppSelector(state => state.courses);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addNewTask = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    if (!currentCourse || !newTaskTitle.trim()) {
      return;
    }

    const newTask: CreateTaskData = {
      courseId: currentCourse.id,
      name: newTaskTitle,
    };

    await dispatch(tasksActions.createTask(newTask));
    setNewTaskTitle('');
  };

  return (
    <form
      className={styles.addTaskForm}
      onSubmit={addNewTask}
    >
      <PlusIcon
        className={styles.plusIcon}
        onClick={() => addNewTask()}
      />

      <input
        type="text"
        className={styles.addTaskInput}
        value={newTaskTitle}
        onChange={e => setNewTaskTitle(e.target.value)}
        placeholder="Add task"
      />
    </form>
  );
};
