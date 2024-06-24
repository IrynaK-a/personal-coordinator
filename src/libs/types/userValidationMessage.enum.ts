import { UserValidationRule } from './userValidationRule.enum';

export const UserValidationMessage = {
  NAME_REQUIRE: 'The name is required',
  NAME_WRONG: `The Name field accepts lowercase latin letters, uppercase latin letters, hyphen and space`,
  NAME_MIN_LENGTH: `The minimal name length - ${UserValidationRule.NAME_MIN_LENGTH}`,
  NAME_MAX_LENGTH: `The maximal name length - ${UserValidationRule.NAME_MAX_LENGTH}`,
  EMAIL_REQUIRE: 'The email is required',
  EMAIL_WRONG: 'Please, enter a correct email',
  PASSWORD_REQUIRE: 'The password is required',
  PASSWORD_MIN_LENGTH: `The minimal password length - ${UserValidationRule.PASSWORD_MIN_LENGTH}`,
  PASSWORD_MAX_LENGTH: `The maximal password length - ${UserValidationRule.PASSWORD_MAX_LENGTH}`,
  PASSWORD_CONTENT_REQUIRE: `Password must contain at least one special character, one digit and one uppercase latin letter`,
  PASSWORD_CONFIRM_REQUIRE: 'Repeat password',
  PASSWORD_CONFIRM_WRONG: 'Passwords do not match',
  COURSE_NAME_REQUIRE: 'The course name is required',
  COURSE_NAME_MIN_LENGTH: `The minimal course name length - ${UserValidationRule.COURSE_NAME_MIN_LENGTH}`,
  COURSE_NAME_MAX_LENGTH: `The maximal course name length - ${UserValidationRule.COURSE_NAME_MAX_LENGTH}`,
  COURSE_DESCRIPTION_MAX_LENGTH: `The maximal course description length - ${UserValidationRule.COURSE_DESCRIPTION_MAX_LENGTH}`,
} as const;
