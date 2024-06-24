import { object, string, ref, ObjectSchema } from 'yup';
import { ISignUpFormData } from '../types/signUpFormData.interface';
import { UserValidationRule } from '../types/userValidationRule.enum';
import { UserValidationMessage } from '../types';

export const signUpSchema: ObjectSchema<ISignUpFormData> = object({
  firstName: string()
    .min(
      UserValidationRule.NAME_MIN_LENGTH,
      UserValidationMessage.NAME_MIN_LENGTH,
    )
    .max(
      UserValidationRule.NAME_MAX_LENGTH,
      UserValidationMessage.NAME_MAX_LENGTH,
    )
    .matches(UserValidationRule.NAME_PATTERN, UserValidationMessage.NAME_WRONG)
    .required(UserValidationMessage.NAME_REQUIRE),
  lastName: string()
    .min(
      UserValidationRule.NAME_MIN_LENGTH,
      UserValidationMessage.NAME_MIN_LENGTH,
    )
    .max(
      UserValidationRule.NAME_MAX_LENGTH,
      UserValidationMessage.NAME_MAX_LENGTH,
    )
    .matches(UserValidationRule.NAME_PATTERN, UserValidationMessage.NAME_WRONG)
    .required(UserValidationMessage.NAME_REQUIRE),
  email: string()
    .matches(
      UserValidationRule.EMAIL_PATTERN,
      UserValidationMessage.EMAIL_WRONG,
    )
    .required(UserValidationMessage.EMAIL_REQUIRE),
  password: string()
    .min(
      UserValidationRule.PASSWORD_MIN_LENGTH,
      UserValidationMessage.PASSWORD_MIN_LENGTH,
    )
    .max(
      UserValidationRule.PASSWORD_MAX_LENGTH,
      UserValidationMessage.PASSWORD_MAX_LENGTH,
    )
    .matches(
      UserValidationRule.PASSWORD_CONTENT_PATTERN,
      UserValidationMessage.PASSWORD_CONTENT_REQUIRE,
    )
    .required(UserValidationMessage.PASSWORD_REQUIRE),
  confirmedPassword: string()
    .oneOf([ref('password')], UserValidationMessage.PASSWORD_CONFIRM_WRONG)
    .required(UserValidationMessage.PASSWORD_CONFIRM_REQUIRE),
});
