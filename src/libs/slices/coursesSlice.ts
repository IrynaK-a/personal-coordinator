/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  UpdateCourseData,
  CreateCourseData,
  DataStatus,
  IDefaultCourse,
  ICourse,
  ValueOf,
} from '../types';
import { myCoursesApi } from '../api/myCoursesApi';
import { defaultCoursesApi } from '../api/defaultCoursesApi';
import { NOTIFICATION_MESSAGES } from '../constants';

export interface ICourseState {
  coursesRequestStatus: ValueOf<typeof DataStatus>;
  deleteCourseRequestStatus: ValueOf<typeof DataStatus>;
  defaultCoursesRequestStatus: ValueOf<typeof DataStatus>;
  currentCoursesRequestStatus: ValueOf<typeof DataStatus>;
  myCourses: ICourse[] | null;
  currentCourse: ICourse | null;
  defaultCourses: IDefaultCourse[] | null;
}

const initialState: ICourseState = {
  coursesRequestStatus: DataStatus.IDLE,
  deleteCourseRequestStatus: DataStatus.IDLE,
  defaultCoursesRequestStatus: DataStatus.IDLE,
  currentCoursesRequestStatus: DataStatus.IDLE,
  myCourses: null,
  currentCourse: null,
  defaultCourses: null,
};

export const getAllDefaultCourses = createAsyncThunk(
  'courses/default',
  async () => {
    const defaultCourses = await defaultCoursesApi.getAll();

    return defaultCourses;
  },
);

export const getAllMyCourses = createAsyncThunk('courses/all', async () => {
  const allCourses = await myCoursesApi.getAll();

  return allCourses;
});

export const deleteCourse = createAsyncThunk(
  'courses/delete',
  async (payload: number) => {
    const deletedId = await myCoursesApi.delete(payload);

    return deletedId;
  },
);

export const createNewCourse = createAsyncThunk(
  'courses/create',
  async (payload: CreateCourseData) => {
    const newCourse = await myCoursesApi.create(payload);

    console.log(newCourse);

    return newCourse;
  },
);

export const getCurrent = createAsyncThunk(
  'courses/current',
  async (payload: number) => {
    const currentCourse = await myCoursesApi.getCurrent(payload);

    return currentCourse;
  },
);

export const updateCurrentCourse = createAsyncThunk(
  'courses/updateCurrent',
  async ({
    updatedCourse,
    id,
  }: {
    id: number;
    updatedCourse: UpdateCourseData;
  }) => {
    const changedCourse = await myCoursesApi.update(id, updatedCourse);

    return changedCourse;
  },
);

export const { reducer, actions } = createSlice({
  initialState,
  name: 'courses',
  reducers: {
    setNoCurrentCourse(state) {
      state.currentCourse = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllMyCourses.fulfilled, (state, { payload }) => {
      state.coursesRequestStatus = DataStatus.FULFILLED;
      state.myCourses = payload;
    });
    builder.addCase(createNewCourse.fulfilled, (state, { payload }) => {
      state.coursesRequestStatus = DataStatus.FULFILLED;
      state.currentCourse = payload;
    });
    builder.addCase(getAllDefaultCourses.fulfilled, (state, { payload }) => {
      state.defaultCoursesRequestStatus = DataStatus.FULFILLED;
      state.defaultCourses = payload;
    });
    builder.addCase(getAllDefaultCourses.pending, state => {
      state.defaultCoursesRequestStatus = DataStatus.PENDING;
    });
    builder.addCase(getAllDefaultCourses.rejected, state => {
      state.defaultCoursesRequestStatus = DataStatus.REJECTED;
      toast.error(NOTIFICATION_MESSAGES.defaultCourses.error);
    });
    builder.addCase(deleteCourse.fulfilled, (state, { payload }) => {
      state.coursesRequestStatus = DataStatus.FULFILLED;
      state.myCourses =
        payload && state.myCourses
          ? state.myCourses.filter(course => course.id !== payload.id)
          : state.myCourses;
      toast.success(NOTIFICATION_MESSAGES.deleteCourse.success);
    });
    builder.addCase(deleteCourse.pending, state => {
      state.deleteCourseRequestStatus = DataStatus.PENDING;
    });
    builder.addCase(deleteCourse.rejected, state => {
      state.deleteCourseRequestStatus = DataStatus.REJECTED;
      toast.error(NOTIFICATION_MESSAGES.deleteCourse.error);
    });
    builder.addCase(getCurrent.fulfilled, (state, { payload }) => {
      state.currentCoursesRequestStatus = DataStatus.FULFILLED;
      state.currentCourse = payload;
    });
    builder.addCase(getCurrent.pending, state => {
      state.currentCoursesRequestStatus = DataStatus.PENDING;
    });
    builder.addCase(getCurrent.rejected, state => {
      state.currentCoursesRequestStatus = DataStatus.REJECTED;
      toast.error(NOTIFICATION_MESSAGES.course.error);
    });
    builder.addCase(updateCurrentCourse.fulfilled, (state, { payload }) => {
      state.currentCoursesRequestStatus = DataStatus.FULFILLED;
      state.currentCourse = payload;
      toast.success(NOTIFICATION_MESSAGES.updateCourse.success);
    });
    builder.addCase(updateCurrentCourse.pending, state => {
      state.currentCoursesRequestStatus = DataStatus.PENDING;
    });
    builder.addCase(updateCurrentCourse.rejected, state => {
      state.currentCoursesRequestStatus = DataStatus.REJECTED;
      toast.error(NOTIFICATION_MESSAGES.updateCourse.error);
    });
    builder.addMatcher(
      isAnyOf(getAllMyCourses.rejected, createNewCourse.rejected),
      state => {
        state.coursesRequestStatus = DataStatus.REJECTED;
        toast.error(NOTIFICATION_MESSAGES.course.error);
      },
    );
    builder.addMatcher(
      isAnyOf(getAllMyCourses.pending, createNewCourse.pending),
      state => {
        state.coursesRequestStatus = DataStatus.PENDING;
      },
    );
  },
});
