import { object, string, ObjectSchema } from 'yup';
import { IFindCourseFormData } from '../types';

export const findCourseSchema: ObjectSchema<IFindCourseFormData> = object({
  about: string().required(),
  teacher: string().required(),
  schedule: string().required(),
  format: string().required(),
  price: string().required(),
});
