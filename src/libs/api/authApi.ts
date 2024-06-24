import { UserSignInRequestDto, UserSignUpRequestDto } from '../types';
import { client } from '../utils/fetchClient';

type AuthUserResponse = {
  user: string;
  token: string;
};

type CurrentUserResponse = {
  firstName: string;
};

export const authApi = {
  signIn: (payload: UserSignInRequestDto) =>
    client.post<AuthUserResponse>('/auth/login', payload, null),

  signUp: (payload: UserSignUpRequestDto) =>
    client.post<AuthUserResponse>('/auth/register', payload, null),

  getCurrentUser: (token: string) =>
    client.get<CurrentUserResponse>('/auth/current-user', token),
};
