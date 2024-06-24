import { object, string, ObjectSchema } from 'yup';
import { UserValidationRule } from '../types/userValidationRule.enum';
import { ISignInFormData, UserValidationMessage } from '../types';

export const signInSchema: ObjectSchema<ISignInFormData> = object({
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
});
