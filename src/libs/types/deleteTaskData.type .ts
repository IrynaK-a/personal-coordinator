import { ICourseTask } from './courseTasks.interface';

export type DeleteTaskData = Pick<ICourseTask, 'courseId' | 'id'>;
