import { ICourseTask } from '../types';

export const sortTasks = (tasks: ICourseTask[]) =>
  [...tasks].sort((firstTask, secondTask) => {
    const firstStatus = firstTask.status === 'COMPLETED' ? 1 : 0;
    const secondStatus = secondTask.status === 'COMPLETED' ? 1 : 0;

    return firstStatus - secondStatus;
  });
