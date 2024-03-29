import { SortType } from '@app/constants/enums/common';
import { BasePaginationRequest, LanguageDataModel } from './ApiModel';

export enum CategoryStatus {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

export enum CategorySortBy {
  code = 'code',
  created = 'created',
  status = 'status',
}
export interface ICategoryModel {
  id: string;
  name: string;
  slug: string;
  numberOfProducts: number;
  icon?: string;
}

export interface CategoryQueryParams extends BasePaginationRequest {
  status?: CategoryStatus | string;
  sortBy: CategorySortBy;
  sortType: SortType;
}

export interface CategoryUpdateBody {
  localizedName?: LanguageDataModel;
  localizedDescription?: LanguageDataModel;
  status?: CategoryStatus;
}

export interface UpdateCategoryResponse {
  id: string;
  isSuccess: boolean;
}

export interface CategoryDeleteResponseModel {
  isSuccess: boolean;
}
export interface CreateCategoryRequest {
  name: string;
  slug: string;
}

export interface UpdateCategoryRequest {
  id: string;
  name: string;
  slug: string;
}

export interface CreateCategoryResponse {
  isSuccess: boolean;
  id: string;
}

export interface UpdateCategoryBody {
  data: CategoryUpdateBody;
  id: string;
}

export interface CategorySetupForm {
  localizedName: string;
  localizedDescription: string;
  status?: boolean;
}

export interface DeleteCategoryResponse {
  id: string;
  isSuccess: boolean;
}

export interface UpdateCategoryRequest {
  id: string;
  name: string;
  slug: string;
}

export interface UpdateCategoryResponse {
  status: boolean;
  Product: ICategoryModel;
}
