import { URL_PATH_EMPLOYEE, URL_PATH_UPDATE_USER, URL_PATH_USER } from '@app/constants/api';
import { BaseResponse } from '@app/domain/ApiModel';
import {
  IUserModel,
  CreateUserRequestModel,
  CreateUserResponseModel,
  UpdateUserRequestModel,
  UpdateUserResponseModel,
  ChangePasswordRequest,
  ChangePasswordResponse,
  DeleteUserResponse,
  UpdateEmployeeResponse,
  UpdateUserStatusRequest,
  UpdateUserStatusResponse,
} from '@app/domain/UserModel';
import { HttpService } from '@app/services/http.service';
import { RouterPaths } from '@app/constants/enums/routerPaths';
import { CreateEmployeeRequest, UpdateEmployeeRequest } from '@app/domain/EmployeeModel';

export const getAllUsers = (): Promise<BaseResponse<IUserModel[]>> => {
  const httpService = new HttpService(process.env.REACT_APP_AUTH_BASE_URL);
  const url = URL_PATH_USER;

  return httpService.get<BaseResponse<IUserModel[]>>(url).then(({ data }) => {
    return data;
  });
};

export const getAllEmployee = (): Promise<BaseResponse<IUserModel[]>> => {
  const httpService = new HttpService(process.env.REACT_APP_AUTH_BASE_URL);
  const url = URL_PATH_USER + '/' + URL_PATH_EMPLOYEE;

  return httpService.get<BaseResponse<IUserModel[]>>(url).then(({ data }) => {
    return data;
  });
};

export const createUser = (params: CreateUserRequestModel): Promise<BaseResponse<CreateUserResponseModel>> => {
  const httpService = new HttpService(process.env.REACT_APP_AUTH_BASE_URL);

  return httpService.post<BaseResponse<CreateUserResponseModel>>(URL_PATH_USER, params).then(({ data }) => {
    return data;
  });
};

export const createEmployee = (params: CreateEmployeeRequest): Promise<BaseResponse<CreateUserResponseModel>> => {
  const httpService = new HttpService(process.env.REACT_APP_AUTH_BASE_URL);

  return httpService
    .post<BaseResponse<CreateUserResponseModel>>(URL_PATH_USER + '/employee', params)
    .then(({ data }) => {
      return data;
    });
};

export const updateUserStatus = (params: UpdateUserStatusRequest): Promise<BaseResponse<UpdateUserStatusResponse>> => {
  const httpService = new HttpService(process.env.REACT_APP_AUTH_BASE_URL);
  const url = URL_PATH_USER + '/update/user-status';

  return httpService.put<BaseResponse<UpdateUserStatusResponse>>(url, params).then(({ data }) => {
    return data;
  });
};

export const getUserById = (id: string): Promise<IUserModel> => {
  const httpService = new HttpService(process.env.REACT_APP_AUTH_BASE_URL);

  return httpService.get<IUserModel>(`${URL_PATH_USER}/${id}`).then(({ data }) => {
    return data;
  });
};

export const deleteEmployeeById = (id: string): Promise<BaseResponse<DeleteUserResponse>> => {
  const httpService = new HttpService(process.env.REACT_APP_BASE_URL);

  return httpService.delete<BaseResponse<DeleteUserResponse>>(`${URL_PATH_USER}/${id}`).then(({ data }) => {
    return data;
  });
};

export const updateEmployee = (params: UpdateEmployeeRequest): Promise<BaseResponse<UpdateEmployeeResponse>> => {
  const httpService = new HttpService(process.env.REACT_APP_BASE_URL);
  const url = URL_PATH_USER + '/employee/update-employee';

  return httpService.put<BaseResponse<UpdateEmployeeResponse>>(url, params).then(({ data }) => {
    return data;
  });
};

export const changePassword = (
  changePasswordRequest: ChangePasswordRequest,
): Promise<BaseResponse<ChangePasswordResponse>> => {
  const httpService = new HttpService(process.env.REACT_APP_AUTH_BASE_URL);

  return httpService
    .post<BaseResponse<ChangePasswordResponse>>(
      URL_PATH_USER + RouterPaths.PATH + RouterPaths.CHANGE_PASSWORD,
      changePasswordRequest,
    )
    .then(({ data }) => {
      return data;
    });
};
