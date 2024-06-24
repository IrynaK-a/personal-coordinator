import { object, string, ObjectSchema } from 'yup';
import { UserValidationRule } from '../types/userValidationRule.enum';
import { ICreateCourseFormData, UserValidationMessage } from '../types';

export const createCourseSchema: ObjectSchema<ICreateCourseFormData> = object({
  name: string()
    .min(
      UserValidationRule.COURSE_NAME_MIN_LENGTH,
      UserValidationMessage.COURSE_NAME_MIN_LENGTH,
    )
    .max(
      UserValidationRule.COURSE_NAME_MAX_LENGTH,
      UserValidationMessage.COURSE_NAME_MAX_LENGTH,
    )
    .required(UserValidationMessage.COURSE_NAME_REQUIRE),
  description: string().max(
    UserValidationRule.COURSE_DESCRIPTION_MAX_LENGTH,
    UserValidationMessage.COURSE_DESCRIPTION_MAX_LENGTH,
  ),
  link: string(),
  image: string(),
});
