import { createAction, createAsyncThunk, createSlice, current, PrepareAction } from '@reduxjs/toolkit';
import { IProductModel } from '@app/domain/ProductModel';
import { getAllCategories } from '@app/api/category.api';
import { IOrderModel } from '@app/domain/OrderModel';
import { getAllOrders } from '@app/api/order.api';

export interface OrderState {
  orders: IOrderModel[] | [];
}
export const STATE_NAME = 'ORDERS';

const initialState: OrderState = {
  orders: [],
};

export const doGetAllOrders = createAsyncThunk('orders/doGetAllOrders', async () => {
  return getAllOrders().then((res) => {
    if (res.data.length != 0) {
      setOrders(res.data);
    }

    return res.data;
  });
});

// export const doCreateUser = createAsyncThunk('user/doCreateUser', async (params: CreateUserRequestModel) => {
//   return createUser(params).then((res) => {
//     return res.data;
//   });
// });

// export const doUpdateStatusUser = createAsyncThunk(
//   'user/doUpdateStatusUser',
//   async (value: UpdateUserRequestParams) => {
//     const requestParams: UpdateUserRequestModel = {
//       enabled: value.enabled,
//     };

//     return updateUser(requestParams, value.id).then((res) => {
//       updateUserSlice(res.data);

//       return res;
//     });
//   },
// );

// export const doUpdateUser = createAsyncThunk('user/doUpdateUser', async (value: UpdateUserRequestParams) => {
//   const requestParams: UpdateUserRequestModel = {
//     enabled: value.enabled,
//     password: value.password,
//     groupName: value.groupName,
//   };

//   return updateUser(requestParams, value.id).then((res) => {
//     updateUserSlice(res.data);

//     return res;
//   });
// });

// export const doGetUserById = createAsyncThunk('user/doGetUserById', async (id: string) => {
//   return getUserById(id).then((response) => {
//     return response.data;
//   });
// });

export const setOrders = createAction<PrepareAction<IProductModel[]>>('order/setOrders', (newOrders) => {
  return {
    payload: newOrders,
  };
});

// export const updateUserSlice = createAction<PrepareAction<IUserModel>>('user/updateUser', (userModify) => {
//   return {
//     payload: userModify,
//   };
// });

// export const doChangePassword = createAsyncThunk(
//   'user/changePassword',
//   async (changePasswordRequest: ChangePasswordRequest) => {
//     return changePassword(changePasswordRequest).then((res) => {
//       return res;
//     });
//   },
// );

export const ordersSlice = createSlice({
  name: STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
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

export default ordersSlice.reducer;
