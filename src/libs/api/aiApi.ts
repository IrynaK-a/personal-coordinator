import { GoogleGenerativeAI } from '@google/generative-ai';
import { IInspirationResponse } from '../types';

const inspirationPrompt =
  // eslint-disable-next-line max-len
  'Provide one motivational quote about studying. It should have a title with a max of 20 characters. Also, it should have a main text of 50 to 100 characters. It should be suitable for all people starting to study and help them become motivated. Answer should be js object, with title and text key';

const genAI = new GoogleGenerativeAI(
  process.env.REACT_APP_GEMINI_API_KEY as string,
);

const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const getInspiraton = async () => {
  const result = await model.generateContent(inspirationPrompt);
  const response = await result.response;
  const answer = response.text();

  return JSON.parse(answer) as IInspirationResponse;
};

export const getCourses = async (prompt: string) => {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const answer = response.text();

  return answer;
};
