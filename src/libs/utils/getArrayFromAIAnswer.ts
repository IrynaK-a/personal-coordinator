import { FindCoursesResponse } from '../types';

export const getArrayFromAIAnswer = (answer: string): FindCoursesResponse => {
  const firstIndex = answer.indexOf('[');
  const lastIndex = answer.indexOf(']') + 1;
  const cleanedString = answer.slice(firstIndex, lastIndex);

  return JSON.parse(cleanedString);
};
