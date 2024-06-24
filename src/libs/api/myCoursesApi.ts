import { ICourse, UpdateCourseData } from '../types';
import { CreateCourseData } from '../types/createCourseData.type';
import { client } from '../utils/fetchClient';
import { getToken } from '../utils/getToken';

export const myCoursesApi = {
  getAll: () => client.get<ICourse[]>('/courses/all', getToken()),

  getCurrent: (courseId: number) =>
    client.get<ICourse>(`/courses/${courseId}`, getToken()),

  create: (payload: CreateCourseData) =>
    client.post<ICourse>('/courses/add', payload, getToken()),

  update: (courseId: number, payload: UpdateCourseData) =>
    client.patch<ICourse>(`/courses/${courseId}`, payload, getToken()),

  delete: (courseId: number) =>
    client.delete<Pick<ICourse, 'id'>>(`/courses/${courseId}`, getToken()),
};
