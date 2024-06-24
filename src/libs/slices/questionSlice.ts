/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { DataStatus, ValueOf } from '../types';
import { sendEmail } from '../api/emailApi';
import { NOTIFICATION_MESSAGES } from '../constants';

export interface IEmailState {
  emailRequestStatus: ValueOf<typeof DataStatus>;
}

const initialState: IEmailState = {
  emailRequestStatus: DataStatus.IDLE,
};

export const sendQuestion = createAsyncThunk(
  'email/send',
  async (form: React.RefObject<HTMLFormElement>) => {
    await sendEmail(form);
  },
);

export const { reducer, actions } = createSlice({
  initialState,
  name: 'email',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(sendQuestion.fulfilled, state => {
      state.emailRequestStatus = DataStatus.FULFILLED;
      toast.success(NOTIFICATION_MESSAGES.sendQuestion.success);
    });
    builder.addCase(sendQuestion.pending, state => {
      state.emailRequestStatus = DataStatus.PENDING;
    });
    builder.addCase(sendQuestion.rejected, state => {
      state.emailRequestStatus = DataStatus.REJECTED;
      toast.error(NOTIFICATION_MESSAGES.sendQuestion.error);
    });
  },
});
