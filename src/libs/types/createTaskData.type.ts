import { ICourseTask } from './courseTasks.interface';

export type CreateTaskData = Pick<ICourseTask, 'courseId' | 'name'>;
