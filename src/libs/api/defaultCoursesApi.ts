import { IDefaultCourse } from '../types/defaultCourse.interface';
import { client } from '../utils/fetchClient';

export const defaultCoursesApi = {
  getAll: () => client.get<IDefaultCourse[]>('/default-course/all'),
};
