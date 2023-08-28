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
import {
  CreateProductRequest,
  IProductModel,
  UpdateProductRequest,
  UpdateProductStatusRequest,
} from '@app/domain/ProductModel';
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProduct,
  updateProductStatus,
} from '@app/api/product.api';

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

export const doCreateProduct = createAsyncThunk('product/doCreateProduct', async (params: CreateProductRequest) => {
  return createProduct(params).then((res) => {
    return res.data;
  });
});

export const doGetProductById = createAsyncThunk('product/doGetProductById', async (id: string) => {
  return getProductById(id).then((response) => {
    return response.data;
  });
});

export const doUpdateProduct = createAsyncThunk('product/doUpdateProduct', async (params: UpdateProductRequest) => {
  return updateProduct(params).then((res) => {
    return res.data;
  });
});

export const doUpdateProductStatus = createAsyncThunk(
  'product/doUpdateProductStatus',
  async (params: UpdateProductStatusRequest) => {
    return updateProductStatus(params).then((res) => {
      return res.data;
    });
  },
);

export const doDeleteProduct = createAsyncThunk('product/doDeleteProduct', async ({ id }: { id: string }) => {
  return deleteProductById(id).then((res) => {
    if (res.data.isSuccess) {
      deleteProduct(id);
    }
    return id;
  });
});

export const setProducts = createAction<PrepareAction<IProductModel[]>>('product/setProduct', (newProduct) => {
  return {
    payload: newProduct,
  };
});

export const deleteProduct = createAction<PrepareAction<string>>('product/deleteProduct', (deletedProductId) => {
  return {
    payload: deletedProductId,
  };
});

export const productsSlice = createSlice({
  name: STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(doDeleteProduct.fulfilled, (state, action) => {
      const id = action.payload;
      const index = state.products.findIndex((product) => product.id === id);

      if (index !== -1) {
        const updatedProducts = [...state.products.slice(0, index), ...state.products.slice(index + 1)];

        state.products = updatedProducts;
      }
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
