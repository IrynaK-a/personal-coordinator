/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  DataStatus,
  FindCoursesResponse,
  IFindCourseFormData,
  IInspirationResponse,
  ValueOf,
} from '../types';
import { FIND_COURSES_FORM_DATA, NOTIFICATION_MESSAGES } from '../constants';
import * as aiApi from '../api/aiApi';
import { getArrayFromAIAnswer } from '../utils/getArrayFromAIAnswer';

export interface IAIState {
  aiInspirationRequestStatus: ValueOf<typeof DataStatus>;
  aiCoursesRequestStatus: ValueOf<typeof DataStatus>;
  inspirationQuote: IInspirationResponse | null;
  foundedCourses: FindCoursesResponse | null;
}

const initialState: IAIState = {
  aiInspirationRequestStatus: DataStatus.IDLE,
  aiCoursesRequestStatus: DataStatus.IDLE,
  inspirationQuote: null,
  foundedCourses: null,
};

export const getInspired = createAsyncThunk('ai/inspiration', async () => {
  const answer = await aiApi.getInspiraton();

  return answer;
});

export const getCourses = createAsyncThunk(
  'ai/courses',
  async (payload: IFindCourseFormData) => {
    const prompt = `Provide 5 links to the courses that are available in 2024th year and are suitable for the person based on the next answers:
    question: ${FIND_COURSES_FORM_DATA[0].label}, answer: ${payload.about};
    question: ${FIND_COURSES_FORM_DATA[1].label}, answer: ${payload.teacher};
    question: ${FIND_COURSES_FORM_DATA[2].label}, answer: ${payload.schedule};
    question: ${FIND_COURSES_FORM_DATA[3].label}, answer: ${payload.format};
    question: ${FIND_COURSES_FORM_DATA[4].label}, answer: ${payload.price}; 
    Use Google search for searching course that are available in 2023.
    Return the result in JSON format. Each object has a name, description, link and image key.
    The value of a key "name" should have max 60 characters, the value of a key "description" should have max 200 characters, the value of a key "link" should be a link to the course page or where it can be found, the value of a key "image" should be a https://cdn-icons-png.flaticon.com/512/4762/4762232.png`;

    const answer = await aiApi.getCourses(prompt);

    const courses = getArrayFromAIAnswer(answer);

    return courses;
  },
);

export const { reducer, actions } = createSlice({
  initialState,
  name: 'ai',
  reducers: {
    setNoFoundedCourses(state) {
      state.foundedCourses = null;
      state.aiCoursesRequestStatus = DataStatus.IDLE;
    },
    deleteInspirationQuote(state) {
      state.inspirationQuote = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getInspired.fulfilled, (state, { payload }) => {
        state.aiInspirationRequestStatus = DataStatus.FULFILLED;
        state.inspirationQuote = payload;
      })
      .addCase(getInspired.pending, state => {
        state.aiInspirationRequestStatus = DataStatus.PENDING;
      })
      .addCase(getInspired.rejected, state => {
        state.aiInspirationRequestStatus = DataStatus.REJECTED;
        state.inspirationQuote = null;
        toast.error(NOTIFICATION_MESSAGES.aiInspiration.error);
      })
      .addCase(getCourses.fulfilled, (state, { payload }) => {
        state.aiCoursesRequestStatus = DataStatus.FULFILLED;
        state.foundedCourses = payload;
      })
      .addCase(getCourses.pending, state => {
        state.aiCoursesRequestStatus = DataStatus.PENDING;
      })
      .addCase(getCourses.rejected, state => {
        state.aiCoursesRequestStatus = DataStatus.REJECTED;
        toast.error(NOTIFICATION_MESSAGES.aiCourses.error);
      });
  },
});
