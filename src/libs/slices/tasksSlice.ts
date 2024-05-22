/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  UpdatedTaskData,
  CreateTaskData,
  DataStatus,
  ValueOf,
  DeleteTaskData,
  ICourseTask,
} from '../types';
import { tasksApi } from '../api/tasksApi';
import { deleteCourse, getCurrent as getCurrentCourse } from './coursesSlice';
import { NOTIFICATION_MESSAGES } from '../constants';

export interface ICourseState {
  taskRequestStatus: ValueOf<typeof DataStatus>;
  deleteTaskRequestStatus: ValueOf<typeof DataStatus>;
  changeTaskRequestStatus: ValueOf<typeof DataStatus>;
  currentTasks: ICourseTask[];
}

const initialState: ICourseState = {
  taskRequestStatus: DataStatus.IDLE,
  deleteTaskRequestStatus: DataStatus.IDLE,
  changeTaskRequestStatus: DataStatus.IDLE,
  currentTasks: [],
};

export const createTask = createAsyncThunk(
  'tasks/add',
  async (payload: CreateTaskData) => {
    const currentTask = await tasksApi.create(payload);

    return currentTask;
  },
);

export const deleteCurrentTask = createAsyncThunk(
  'tasks/delete',
  async (payload: DeleteTaskData) => {
    const deletedTask = await tasksApi.delete(payload);

    return deletedTask;
  },
);

export const updateCurrentTask = createAsyncThunk(
  'tasks/change',
  async (payload: UpdatedTaskData) => {
    const updatedTask = await tasksApi.update(payload);

    return updatedTask;
  },
);

export const { reducer, actions } = createSlice({
  initialState,
  name: 'tasks',
  reducers: {
    setNoCurrentTasks(state) {
      state.currentTasks = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      state.taskRequestStatus = DataStatus.FULFILLED;
      state.currentTasks.push(payload);
    });
    builder.addCase(createTask.pending, state => {
      state.taskRequestStatus = DataStatus.PENDING;
    });
    builder.addCase(createTask.rejected, state => {
      state.taskRequestStatus = DataStatus.REJECTED;
      toast.error(NOTIFICATION_MESSAGES.task.error);
    });
    builder.addCase(deleteCurrentTask.fulfilled, (state, { payload }) => {
      state.deleteTaskRequestStatus = DataStatus.FULFILLED;
      state.currentTasks = state.currentTasks.filter(
        task => task.id !== payload,
      );
      toast.success(NOTIFICATION_MESSAGES.deleteTask.success);
    });
    builder.addCase(deleteCurrentTask.pending, state => {
      state.deleteTaskRequestStatus = DataStatus.PENDING;
    });
    builder.addCase(deleteCurrentTask.rejected, state => {
      state.deleteTaskRequestStatus = DataStatus.REJECTED;
      toast.error(NOTIFICATION_MESSAGES.deleteTask.error);
    });
    builder.addCase(updateCurrentTask.fulfilled, (state, { payload }) => {
      state.deleteTaskRequestStatus = DataStatus.FULFILLED;
      state.currentTasks.forEach(task => {
        if (task.id === payload?.id) {
          task.name = payload.name;
          task.status = payload.status;
        }
      });
    });
    builder.addCase(updateCurrentTask.pending, state => {
      state.deleteTaskRequestStatus = DataStatus.PENDING;
    });
    builder.addCase(updateCurrentTask.rejected, state => {
      state.deleteTaskRequestStatus = DataStatus.REJECTED;
      toast.error(NOTIFICATION_MESSAGES.task.error);
    });
    builder.addCase(getCurrentCourse.fulfilled, (state, { payload }) => {
      state.taskRequestStatus = DataStatus.FULFILLED;
      state.currentTasks = payload.courseTasks;
    });
    builder.addCase(deleteCourse.fulfilled, state => {
      state.currentTasks = [];
    });
  },
});
