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
import { IProductModel } from '@app/domain/ProductModel';
import { getAllProducts } from '@app/api/product.api';

export interface ProductState {
  products: IProductModel[] | [];
}
export const STATE_NAME = 'Products';

const initialState: ProductState = {
  products: [],
};

export const doGetAllProducts = createAsyncThunk('product/doGetAllProducts', async () => {
  return getAllProducts().then((res) => {
    if (res.data.length != 0) {
      setProducts(res.data);
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

export const setProducts = createAction<PrepareAction<IProductModel[]>>('product/setProduct', (newProduct) => {
  return {
    payload: newProduct,
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

export const productsSlice = createSlice({
  name: STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    //   .addCase(doUpdateStatusUser.fulfilled, (state, action) => {
    //     const stateData = [...current(state.users)];
    //     const user = action.payload.data.user;
    //     const isFound = stateData.findIndex((e) => e.id === user.id);

    //     if (isFound != -1) {
    //       const temp = { ...stateData[isFound] };
    //       temp.status = user.status;
    //       stateData[isFound] = temp;
    //     }

    //     state.users = stateData;
    //   });
  },
});

export default productsSlice.reducer;
