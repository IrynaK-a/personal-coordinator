/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  DataStatus,
  StorageKey,
  UserSignInRequestDto,
  UserSignUpRequestDto,
  ValueOf,
} from '../types';
import { authApi } from '../api/authApi';
import { NOTIFICATION_MESSAGES } from '../constants';

export interface IAuthState {
  authRequestStatus: ValueOf<typeof DataStatus>;
  user: string | null;
}

const initialState: IAuthState = {
  authRequestStatus: DataStatus.IDLE,
  user: null,
};

export const getCurrentUser = createAsyncThunk('auth/current', async () => {
  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    return null;
  }

  try {
    const { firstName } = await authApi.getCurrentUser(token);

    return firstName;
  } catch {
    localStorage.removeItem(StorageKey.TOKEN);

    return null;
  }
});

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload: UserSignUpRequestDto) => {
    const { user, token } = await authApi.signUp(payload);

    localStorage.setItem(StorageKey.TOKEN, token);

    return user;
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload: UserSignInRequestDto) => {
    const { user, token } = await authApi.signIn(payload);

    localStorage.setItem(StorageKey.TOKEN, token);

    return user;
  },
);

export const { reducer, actions } = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    logOut: state => {
      state.user = null;
      localStorage.removeItem(StorageKey.TOKEN);
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        isAnyOf(getCurrentUser.fulfilled, signUp.fulfilled, signIn.fulfilled),
        (state, { payload }) => {
          state.authRequestStatus = DataStatus.FULFILLED;
          state.user = payload;
        },
      )
      .addMatcher(
        isAnyOf(getCurrentUser.pending, signUp.pending, signIn.pending),
        state => {
          state.authRequestStatus = DataStatus.PENDING;
        },
      )
      .addMatcher(
        isAnyOf(getCurrentUser.rejected, signUp.rejected, signIn.rejected),
        state => {
          state.authRequestStatus = DataStatus.REJECTED;
          toast.error(NOTIFICATION_MESSAGES.auth.error);
        },
      );
  },
});
