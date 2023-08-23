import { createAction, createAsyncThunk, createSlice, current, PrepareAction } from '@reduxjs/toolkit';
import { changePassword, createUser, getAllUsers, getUserById, updateUser } from '@app/api/user.api';
import { GroupUserEnum } from '@app/constants/enums/groupUser';
import { mergeAndDistinct } from '@app/utils/utils';
import {
  IUserModel,
  CreateUserRequestModel,
  UpdateUserRequestParams,
  UpdateUserRequestModel,
  ChangePasswordRequest,
} from '@app/domain/UserModel';
import { BasePaginationRequest } from '@app/domain/ApiModel';

export interface UserState {
  users: IUserModel[] | [];
}
export const STATE_NAME = 'Users';

const initialState: UserState = {
  users: [],
};

export const doGetAllUsers = createAsyncThunk('user/doGetAllUsers', async () => {
  return getAllUsers().then((res) => {
    if (res.data.length != 0) {
      setUsers(res.data);
    }

    return res.data;
  });
});

export const doCreateUser = createAsyncThunk('user/doCreateUser', async (params: CreateUserRequestModel) => {
  return createUser(params).then((res) => {
    return res.data;
  });
});

export const doUpdateStatusUser = createAsyncThunk(
  'user/doUpdateStatusUser',
  async (value: UpdateUserRequestParams) => {
    const requestParams: UpdateUserRequestModel = {
      enabled: value.enabled,
    };

    return updateUser(requestParams, value.id).then((res) => {
      updateUserSlice(res.data);

      return res;
    });
  },
);

export const doUpdateUser = createAsyncThunk('user/doUpdateUser', async (value: UpdateUserRequestParams) => {
  const requestParams: UpdateUserRequestModel = {
    enabled: value.enabled,
    password: value.password,
    groupName: value.groupName,
  };

  return updateUser(requestParams, value.id).then((res) => {
    updateUserSlice(res.data);

    return res;
  });
});

export const doGetUserById = createAsyncThunk('user/doGetUserById', async (id: string) => {
  return getUserById(id).then((response) => {
    return response.data;
  });
});

export const setUsers = createAction<PrepareAction<IUserModel[]>>('user/setUser', (newUser) => {
  return {
    payload: newUser,
  };
});

export const updateUserSlice = createAction<PrepareAction<IUserModel>>('user/updateUser', (userModify) => {
  return {
    payload: userModify,
  };
});

export const doChangePassword = createAsyncThunk(
  'user/changePassword',
  async (changePasswordRequest: ChangePasswordRequest) => {
    return changePassword(changePasswordRequest).then((res) => {
      return res;
    });
  },
);

export const usersSlice = createSlice({
  name: STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(doGetAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(doUpdateStatusUser.fulfilled, (state, action) => {
        const stateData = [...current(state.users)];
        const user = action.payload.data.user;
        const isFound = stateData.findIndex((e) => e.id === user.id);

        if (isFound != -1) {
          const temp = { ...stateData[isFound] };
          temp.status = user.status;
          stateData[isFound] = temp;
        }

        state.users = stateData;
      });
  },
});

export default usersSlice.reducer;
