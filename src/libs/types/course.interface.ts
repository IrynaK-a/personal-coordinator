import { ICourseTask } from './courseTasks.interface';

export interface ICourse {
  id: number;
  userId: number;
  name: string;
  description: string;
  status: string;
  startDate: string;
  link: string;
  image: string;
  courseTasks: ICourseTask[];
}
