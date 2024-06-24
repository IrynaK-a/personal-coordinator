import {
  CreateTaskData,
  ICourseTask,
  UpdatedTaskData,
  DeleteTaskData,
} from '../types';
import { client } from '../utils/fetchClient';
import { getToken } from '../utils/getToken';

export const tasksApi = {
  create: ({ courseId, name }: CreateTaskData) =>
    client.post<ICourseTask>(`/courses/add/${courseId}`, { name }, getToken()),

  update: ({ status, name, id: taskId }: UpdatedTaskData) =>
    client.patch<ICourseTask>(`/tasks/${taskId}`, { name, status }, getToken()),

  delete: ({ courseId, id: taskId }: DeleteTaskData) =>
    client.delete<number>(`/courses/${taskId}/${courseId}`, getToken()),
};
