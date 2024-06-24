import { ISignUpFormData } from './signUpFormData.interface';

export type UserSignUpRequestDto = Omit<ISignUpFormData, 'confirmedPassword'>;
