import { createAction, createAsyncThunk, createSlice, current, PrepareAction } from '@reduxjs/toolkit';
import {
  changePassword,
  createEmployee,
  createUser,
  deleteEmployeeById,
  getAllEmployee,
  getAllUsers,
  getUserById,
  updateEmployee,
  updateUserStatus,
} from '@app/api/user.api';
import { GroupUserEnum } from '@app/constants/enums/groupUser';
import { mergeAndDistinct } from '@app/utils/utils';
import {
  IUserModel,
  CreateUserRequestModel,
  ChangePasswordRequest,
  UpdateUserStatusRequest,
} from '@app/domain/UserModel';
import { CreateEmployeeRequest, UpdateEmployeeRequest } from '@app/domain/EmployeeModel';

export interface UserState {
  users: IUserModel[] | [];
  employee: IUserModel[] | [];
}
export const STATE_NAME = 'Users';

const initialState: UserState = {
  users: [],
  employee: [],
};

export const doGetAllUsers = createAsyncThunk('user/doGetAllUsers', async () => {
  return getAllUsers().then((res) => {
    if (res.data.length != 0) {
      setUsers(res.data);
    }

    return res.data;
  });
});

export const doGetAllEmployee = createAsyncThunk('user/doGetAllEmployee', async () => {
  return getAllEmployee().then((res) => {
    if (res.data.length != 0) {
      setEmployee(res.data);
    }

    return res.data;
  });
});

export const doCreateUser = createAsyncThunk('user/doCreateUser', async (params: CreateUserRequestModel) => {
  return createUser(params).then((res) => {
    return res.data;
  });
});

export const doCreateEmployee = createAsyncThunk('user/doCreateEmployee', async (params: CreateEmployeeRequest) => {
  return createEmployee(params).then((res) => {
    return res.data;
  });
});

export const doUpdateStatusUser = createAsyncThunk(
  'user/doUpdateStatusUser',
  async (value: UpdateUserStatusRequest) => {
    return updateUserStatus(value).then((res) => {
      return res.data;
    });
  },
);

export const doUpdateEmployee = createAsyncThunk('employee/doUpdateEmployee', async (params: UpdateEmployeeRequest) => {
  return updateEmployee(params).then((res) => {
    return res.data;
  });
});

export const doGetUserById = createAsyncThunk('user/doGetUserById', async (id: string) => {
  return getUserById(id).then((response) => {
    return response;
  });
});

export const doDeleteEmployee = createAsyncThunk('employee/doDeleteEmployee', async ({ id }: { id: string }) => {
  return deleteEmployeeById(id).then((res) => {
    if (res.data.isSuccess) {
      deleteEmployee(id);
    }
    return id;
  });
});

export const deleteEmployee = createAction<PrepareAction<string>>('employee/deleteEmployee', (deletedEmployeeId) => {
  return {
    payload: deletedEmployeeId,
  };
});

export const setUsers = createAction<PrepareAction<IUserModel[]>>('user/setUser', (newUser) => {
  return {
    payload: newUser,
  };
});

export const setEmployee = createAction<PrepareAction<IUserModel[]>>('user/setEmployee', (newEmployee) => {
  return {
    payload: newEmployee,
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
      .addCase(doGetAllEmployee.fulfilled, (state, action) => {
        state.employee = action.payload;
      })
      .addCase(doDeleteEmployee.fulfilled, (state, action) => {
        const id = action.payload;
        const index = state.employee.findIndex((product) => product.id === id);

        if (index !== -1) {
          const updatedemployee = [...state.employee.slice(0, index), ...state.employee.slice(index + 1)];

          state.employee = updatedemployee;
        }
      });
  },
});

export default usersSlice.reducer;
