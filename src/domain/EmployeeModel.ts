import { SortType } from '@app/constants/enums/common';
import { BasePaginationRequest, LanguageDataModel } from './ApiModel';
import { StringLiteral } from 'typescript';

export enum EmployeeStatus {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

export enum EmployeeSortBy {
  code = 'code',
  created = 'created',
  status = 'status',
}
export interface IEmployeeModel {
  id: string;
  name: string;
  slug: string;
  numberOfProducts: number;
  icon?: string;
}

export interface EmployeeQueryParams extends BasePaginationRequest {
  status?: EmployeeStatus | string;
  sortBy: EmployeeSortBy;
  sortType: SortType;
}

export interface EmployeeUpdateBody {
  localizedName?: LanguageDataModel;
  localizedDescription?: LanguageDataModel;
  status?: EmployeeStatus;
}

export interface UpdateEmployeeResponse {
  id: string;
  isSuccess: boolean;
}

export interface EmployeeDeleteResponseModel {
  isSuccess: boolean;
}
export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  dateHired: string;
  nationalID: string;
  position: string;
  phone: string;
  address: string;
  email: string;
}

export interface UpdateEmployeeRequest {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  dateHired: string;
  nationalID: string;
  position: string;
  phone: string;
  address: string;
  email: string;
}

export interface CreateEmployeeResponse {
  isSuccess: boolean;
  id: string;
}

export interface UpdateEmployeeBody {
  data: EmployeeUpdateBody;
  id: string;
}

export interface EmployeeSetupForm {
  localizedName: string;
  localizedDescription: string;
  status?: boolean;
}

export interface DeleteEmployeeResponse {
  id: string;
  isSuccess: boolean;
}

export interface UpdateEmployeeResponse {
  status: boolean;
  Product: IEmployeeModel;
}
