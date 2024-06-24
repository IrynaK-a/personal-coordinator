type FieldsName = 'about' | 'teacher' | 'schedule' | 'format' | 'price';

export const FIND_COURSES_FORM_DATA: {
  fieldName: FieldsName;
  label: string;
  value: string;
}[] = [
  {
    fieldName: 'about',
    label: `What's the course about?`,
    value: `The course is about digital marketing strategies and techniques for small businesses`,
  },
  {
    fieldName: 'teacher',
    label: `Who would you prefer to teach it?`,
    value: `I would prefer the course to be taught by a marketing professional with experience in small business marketing`,
  },
  {
    fieldName: 'schedule',
    label: `What is the schedule?`,
    value: `The course is 6 weeks long, with one-hour sessions twice a week`,
  },
  {
    fieldName: 'format',
    label: `Is it online or in-person?`,
    value: `The course is in online format`,
  },
  {
    fieldName: 'price',
    label: `What is the cost of the course?`,
    value: `The course fee is $199`,
  },
];
