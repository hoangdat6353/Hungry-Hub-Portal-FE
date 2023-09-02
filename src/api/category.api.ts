import {
  URL_PATH_CATEGORY,
  URL_PATH_GET_ALL_USER_GROUP,
  URL_PATH_PRODUCT,
  URL_PATH_UPDATE_USER,
  URL_PATH_USER,
} from '@app/constants/api';
import { BaseResponse, BaseStatusResponse } from '@app/domain/ApiModel';
import { HttpService } from '@app/services/http.service';

import {
  CreateCategoryRequest,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  ICategoryModel,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
} from '@app/domain/CategoryModel';

export const getAllCategories = (): Promise<BaseResponse<ICategoryModel[]>> => {
  const httpService = new HttpService(process.env.REACT_APP_AUTH_BASE_URL);
  const url = URL_PATH_CATEGORY;

  return httpService.get<BaseResponse<ICategoryModel[]>>(url).then(({ data }) => {
    return data;
  });
};

export const createCategory = (params: CreateCategoryRequest): Promise<BaseResponse<CreateCategoryResponse>> => {
  const httpService = new HttpService(process.env.REACT_APP_BASE_URL);
  const url = URL_PATH_CATEGORY;

  return httpService.post<BaseResponse<CreateCategoryResponse>>(url, params).then(({ data }) => {
    return data;
  });
};

export const uploadCategoryImage = (id: string, file: File): Promise<BaseResponse<BaseStatusResponse>> => {
  const httpService = new HttpService(process.env.REACT_APP_BASE_URL);
  const formData = new FormData();
  formData.append('file', file, file.name);
  const url = URL_PATH_CATEGORY + `/${id}` + '/' + 'upload';

  return httpService.post<BaseResponse<BaseStatusResponse>>(url, formData).then(({ data }) => {
    return data;
  });
};

export const deleteCategoryById = (id: string): Promise<BaseResponse<DeleteCategoryResponse>> => {
  const httpService = new HttpService(process.env.REACT_APP_BASE_URL);

  return httpService.delete<BaseResponse<DeleteCategoryResponse>>(`${URL_PATH_CATEGORY}/${id}`).then(({ data }) => {
    return data;
  });
};

export const updateCategory = (params: UpdateCategoryRequest): Promise<BaseResponse<UpdateCategoryResponse>> => {
  const httpService = new HttpService(process.env.REACT_APP_BASE_URL);
  const url = URL_PATH_CATEGORY;

  return httpService.put<BaseResponse<UpdateCategoryResponse>>(url, params).then(({ data }) => {
    return data;
  });
};

export const getCategoryById = (id: string): Promise<BaseResponse<ICategoryModel>> => {
  const httpService = new HttpService(process.env.REACT_APP_BASE_URL);

  return httpService.get<BaseResponse<ICategoryModel>>(`${URL_PATH_CATEGORY}/find-by-id/${id}`).then(({ data }) => {
    return data;
  });
};
