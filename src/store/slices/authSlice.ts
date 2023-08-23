import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  ResetPasswordRequest,
  login,
  LoginRequest,
  signUp,
  SignUpRequest,
  resetPassword,
  verifySecurityCode,
  SecurityCodePayload,
  NewPasswordData,
  setNewPassword,
} from '@app/api/auth.api';
import {
  clearLocalStore,
  deleteToken,
  persistToken,
  persistUserInfo,
  readToken,
  readUserInfo,
} from '@app/services/localStorage.service';
import { decodeToken } from '@app/utils/utils';
import { UserInfo } from '@app/domain/UserModel';

export interface AuthSlice {
  token: string | null;
  userInfo: UserInfo | null;
}

const initialState: AuthSlice = {
  token: readToken(),
  userInfo: readUserInfo(),
};

export const doLogin = createAsyncThunk('auth/doLogin', async (loginPayload: LoginRequest) => {
  return login(loginPayload).then(async (res) => {
    res.data.accessToken && persistToken(res.data.accessToken);

    const userInfo = await decodeToken(res.data.accessToken);
    userInfo && persistUserInfo(userInfo);

    const response: AuthSlice = {
      token: res.data.accessToken,
      userInfo: userInfo,
    };

    return response;
  });
});

export const doSignUp = createAsyncThunk('auth/doSignUp', async (signUpPayload: SignUpRequest) =>
  signUp(signUpPayload),
);

export const doResetPassword = createAsyncThunk(
  'auth/doResetPassword',
  async (resetPassPayload: ResetPasswordRequest) => resetPassword(resetPassPayload),
);

export const doVerifySecurityCode = createAsyncThunk(
  'auth/doVerifySecurityCode',
  async (securityCodePayload: SecurityCodePayload) => verifySecurityCode(securityCodePayload),
);

export const doSetNewPassword = createAsyncThunk('auth/doSetNewPassword', async (newPasswordData: NewPasswordData) =>
  setNewPassword(newPasswordData),
);

export const doLogout = createAsyncThunk('auth/doLogout', () => {
  deleteToken();
  clearLocalStore();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    });
    builder.addCase(doLogout.fulfilled, (state) => {
      state.token = '';
      state.userInfo = null;
    });
  },
});

export default authSlice.reducer;
