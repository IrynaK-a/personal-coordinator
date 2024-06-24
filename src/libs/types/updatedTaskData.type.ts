import { ICourseTask } from './courseTasks.interface';

export type UpdatedTaskData = Pick<ICourseTask, 'id' | 'name' | 'status'>;
