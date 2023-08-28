import { HttpService } from './../services/http.service';
import './mocks/auth.api.mock';
import { httpApi } from './http.api';
import { BaseResponse } from '@app/domain/ApiModel';
import { URL_PATH_USER } from '@app/constants/api';

export interface AuthData {
  email: string;
  password: string;
  isPortal: boolean;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface SecurityCodePayload {
  code: string;
}

export interface NewPasswordData {
  newPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  isPortal: boolean;
}

export interface LoginResponse {
  id: number;
  token: string;
  email: string;
  role: string;
}

export const login = (loginPayload: LoginRequest): Promise<BaseResponse<LoginResponse>> => {
  const httpService = new HttpService(process.env.REACT_APP_AUTH_BASE_URL);

  console.log('LOGIN PAYLOAD HERE:', loginPayload);
  return httpService
    .post<BaseResponse<LoginResponse>>(URL_PATH_USER + '/login', { ...loginPayload })
    .then(({ data }) => {
      return data;
    });
};

export const signUp = (signUpData: SignUpRequest): Promise<undefined> =>
  httpApi.post<undefined>('signUp', { ...signUpData }).then(({ data }) => data);

export const resetPassword = (resetPasswordPayload: ResetPasswordRequest): Promise<undefined> =>
  httpApi.post<undefined>('forgotPassword', { ...resetPasswordPayload }).then(({ data }) => data);

export const verifySecurityCode = (securityCodePayload: SecurityCodePayload): Promise<undefined> =>
  httpApi.post<undefined>('verifySecurityCode', { ...securityCodePayload }).then(({ data }) => data);

export const setNewPassword = (newPasswordData: NewPasswordData): Promise<undefined> =>
  httpApi.post<undefined>('setNewPassword', { ...newPasswordData }).then(({ data }) => data);
