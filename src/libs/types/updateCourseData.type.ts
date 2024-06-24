import { ICourse } from './course.interface';

export type UpdateCourseData = Pick<
  ICourse,
  'link' | 'name' | 'status' | 'description'
>;
