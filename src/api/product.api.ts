import { URL_PATH_GET_ALL_USER_GROUP, URL_PATH_PRODUCT, URL_PATH_UPDATE_USER, URL_PATH_USER } from '@app/constants/api';
import { BaseResponse, BaseStatusResponse } from '@app/domain/ApiModel';
import {
  IUserModel,
  CreateUserRequestModel,
  CreateUserResponseModel,
  UpdateUserRequestModel,
  UpdateUserResponseModel,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from '@app/domain/UserModel';
import { HttpService } from '@app/services/http.service';
import { RouterPaths } from '@app/constants/enums/routerPaths';
import {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductResponse,
  IProductModel,
  UpdateProductRequest,
  UpdateProductResponse,
  UpdateProductStatusRequest,
} from '@app/domain/ProductModel';

export const getAllProducts = (): Promise<BaseResponse<IProductModel[]>> => {
  const httpService = new HttpService(process.env.REACT_APP_BASE_URL);
  const url = URL_PATH_PRODUCT + '/all';

  return httpService.get<BaseResponse<IProductModel[]>>(url).then(({ data }) => {
    return data;
  });
};

export const createProduct = (params: CreateProductRequest): Promise<BaseResponse<CreateProductResponse>> => {
  const httpService = new HttpService(process.env.REACT_APP_BASE_URL);
  const url = URL_PATH_PRODUCT;

  return httpService.post<BaseResponse<CreateProductResponse>>(url, params).then(({ data }) => {
    return data;
  });
};

export const uploadProductImage = (id: string, file: File): Promise<BaseResponse<BaseStatusResponse>> => {
  const httpService = new HttpService(process.env.REACT_APP_BASE_URL);
  const formData = new FormData();
  formData.append('file', file, file.name);
  const url = URL_PATH_PRODUCT + `/${id}` + '/' + 'upload';

  return httpService.post<BaseResponse<BaseStatusResponse>>(url, formData).then(({ data }) => {
    return data;
  });
};

export const getProductById = (id: string): Promise<BaseResponse<IProductModel>> => {
  const httpService = new HttpService(process.env.REACT_APP_BASE_URL);

  return httpService.get<BaseResponse<IProductModel>>(`${URL_PATH_PRODUCT}/find-by-id/${id}`).then(({ data }) => {
    return data;
  });
};

export const updateProduct = (params: UpdateProductRequest): Promise<BaseResponse<UpdateProductResponse>> => {
  const httpService = new HttpService(process.env.REACT_APP_BASE_URL);
  const url = URL_PATH_PRODUCT;

  return httpService.put<BaseResponse<UpdateProductResponse>>(url, params).then(({ data }) => {
    return data;
  });
};

export const updateProductStatus = (
  params: UpdateProductStatusRequest,
): Promise<BaseResponse<UpdateProductResponse>> => {
  const httpService = new HttpService(process.env.REACT_APP_BASE_URL);
  const url = URL_PATH_PRODUCT + '/' + 'product-status';

  return httpService.put<BaseResponse<UpdateProductResponse>>(url, params).then(({ data }) => {
    return data;
  });
};

export const deleteProductById = (id: string): Promise<BaseResponse<DeleteProductResponse>> => {
  const httpService = new HttpService(process.env.REACT_APP_BASE_URL);

  return httpService.delete<BaseResponse<DeleteProductResponse>>(`${URL_PATH_PRODUCT}/${id}`).then(({ data }) => {
    return data;
  });
};

// export const changePassword = (
//   changePasswordRequest: ChangePasswordRequest,
// ): Promise<BaseResponse<ChangePasswordResponse>> => {
//   const httpService = new HttpService(process.env.REACT_APP_AUTH_BASE_URL);

//   return httpService
//     .post<BaseResponse<ChangePasswordResponse>>(
//       URL_PATH_USER + RouterPaths.PATH + RouterPaths.CHANGE_PASSWORD,
//       changePasswordRequest,
//     )
//     .then(({ data }) => {
//       return data;
//     });
// };
