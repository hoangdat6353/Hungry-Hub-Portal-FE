import { URL_PATH_ORDER, URL_PATH_PRODUCT } from '@app/constants/api';
import { BaseResponse } from '@app/domain/ApiModel';
import { HttpService } from '@app/services/http.service';
import { IOrderModel } from '@app/domain/OrderModel';

export const getAllOrders = (): Promise<BaseResponse<IOrderModel[]>> => {
  const httpService = new HttpService(process.env.REACT_APP_AUTH_BASE_URL);
  const url = URL_PATH_PRODUCT + '/' + URL_PATH_ORDER;

  return httpService.get<BaseResponse<IOrderModel[]>>(url).then(({ data }) => {
    return data;
  });
};

// export const createUser = (params: CreateUserRequestModel): Promise<BaseResponse<CreateUserResponseModel>> => {
//   const httpService = new HttpService(process.env.REACT_APP_AUTH_BASE_URL);

//   return httpService.post<BaseResponse<CreateUserResponseModel>>(URL_PATH_USER, params).then(({ data }) => {
//     return data;
//   });
// };

// export const updateUser = (
//   params: UpdateUserRequestModel,
//   id: string,
// ): Promise<BaseResponse<UpdateUserResponseModel>> => {
//   const httpService = new HttpService(process.env.REACT_APP_AUTH_BASE_URL);
//   const url = URL_PATH_UPDATE_USER.replace('{id}', id);

//   return httpService.put<BaseResponse<UpdateUserResponseModel>>(url, params).then(({ data }) => {
//     return data;
//   });
// };

// export const getUserById = (id: string): Promise<BaseResponse<IUserModel>> => {
//   const httpService = new HttpService(process.env.REACT_APP_AUTH_BASE_URL);

//   return httpService.get<BaseResponse<IUserModel>>(`${URL_PATH_USER}/${id}`).then(({ data }) => {
//     return data;
//   });
// };

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
