import { createAction, createAsyncThunk, createSlice, current, PrepareAction } from '@reduxjs/toolkit';
import { IProductModel } from '@app/domain/ProductModel';
import { CreateCategoryRequest, ICategoryModel, UpdateCategoryRequest } from '@app/domain/CategoryModel';
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '@app/api/category.api';

export interface CategoryState {
  categories: ICategoryModel[] | [];
}
export const STATE_NAME = 'Categoriess';

const initialState: CategoryState = {
  categories: [],
};

export const doGetAllCategories = createAsyncThunk('categories/doGetAllCategories', async () => {
  return getAllCategories().then((res) => {
    if (res.data.length != 0) {
      setCategories(res.data);
    }

    return res.data;
  });
});

export const doCreateCategory = createAsyncThunk('category/doCreateCategory', async (params: CreateCategoryRequest) => {
  return createCategory(params).then((res) => {
    return res.data;
  });
});

export const doDeleteCategory = createAsyncThunk('category/doDeleteCategory', async ({ id }: { id: string }) => {
  return deleteCategoryById(id).then((res) => {
    if (res.data.isSuccess) {
      deleteCategory(id);
    }
    return id;
  });
});

export const setProducts = createAction<PrepareAction<IProductModel[]>>('product/setProduct', (newProduct) => {
  return {
    payload: newProduct,
  };
});

export const deleteCategory = createAction<PrepareAction<string>>('category/deleteCategory', (deletedCategoryId) => {
  return {
    payload: deletedCategoryId,
  };
});

export const doGetCategoryById = createAsyncThunk('category/doGetCategoryById', async (id: string) => {
  return getCategoryById(id).then((response) => {
    return response.data;
  });
});

export const doUpdateCategory = createAsyncThunk('category/doUpdateCategory', async (params: UpdateCategoryRequest) => {
  return updateCategory(params).then((res) => {
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

export const setCategories = createAction<PrepareAction<ICategoryModel[]>>(
  'category/setCategories',
  (newCategories) => {
    return {
      payload: newCategories,
    };
  },
);

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

export const categoriesSlice = createSlice({
  name: STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(doDeleteCategory.fulfilled, (state, action) => {
      const id = action.payload;
      const index = state.categories.findIndex((product) => product.id === id);

      if (index !== -1) {
        const updatedcategories = [...state.categories.slice(0, index), ...state.categories.slice(index + 1)];

        state.categories = updatedcategories;
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

export default categoriesSlice.reducer;
