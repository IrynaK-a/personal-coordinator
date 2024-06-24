import { ICourse } from './course.interface';

export type CreateCourseData = Pick<
  ICourse,
  'link' | 'name' | 'image' | 'description'
>;
