/* eslint-disable max-len */
export const UserValidationRule = {
  PASSWORD_MIN_LENGTH: 4,
  PASSWORD_MAX_LENGTH: 20,
  EMAIL_PATTERN:
    /^(?=.{1,64}@.{1,255}$)[\w.-]+(?<!\.)(?<!\.\.)@[\dA-Za-z-]+(?:\.[\dA-Za-z-]+)+$/,
  PASSWORD_CONTENT_PATTERN:
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~-])[\w!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+$/,
  NAME_PATTERN: /^[ A-Za-z-]+$/,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 64,
  COURSE_NAME_MIN_LENGTH: 2,
  COURSE_NAME_MAX_LENGTH: 60,
  COURSE_DESCRIPTION_MAX_LENGTH: 200,
} as const;
