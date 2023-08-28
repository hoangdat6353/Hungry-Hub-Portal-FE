import { SortType } from '@app/constants/enums/common';
import { BasePaginationRequest, LanguageDataModel } from './ApiModel';

export enum ProductStatus {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

export enum ProductSortBy {
  code = 'code',
  created = 'created',
  status = 'status',
}
export interface IProductModel {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  salePrice: number;
  unit: string;
  isBestSeller: boolean;
  isPopular: boolean;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface CreateProductRequest {
  name: string;
  slug: string;
  quantity: number;
  price: number;
  description: string;
  unit: string;
  isBestSeller: boolean;
  isPopular: boolean;
  categoryId: string;
}

export interface UpdateProductRequest {
  id: string;
  name: string;
  slug: string;
  quantity: number;
  price: number;
  description: string;
  unit: string;
  isBestSeller: boolean;
  isPopular: boolean;
  categoryId: string;
}

export interface UpdateProductResponse {
  id: string;
  isSuccess: boolean;
}

export interface UpdateProductStatusRequest {
  id: string;
  isBestSeller: boolean;
  isPopular: boolean;
}

export interface DeleteProductResponse {
  id: string;
  isSuccess: boolean;
}

export interface ProductQueryParams extends BasePaginationRequest {
  status?: ProductStatus | string;
  sortBy: ProductSortBy;
  sortType: SortType;
}

export interface ProductUpdateBody {
  localizedName?: LanguageDataModel;
  localizedDescription?: LanguageDataModel;
  status?: ProductStatus;
}

export interface UpdateProductResponse {
  status: boolean;
  Product: IProductModel;
}

export interface ProductDeleteResponseModel {
  isSuccess: boolean;
}

export interface CreateProductResponse {
  isSuccess: boolean;
  id: string;
}

export interface UpdateProductBody {
  data: ProductUpdateBody;
  id: string;
}

export interface ProductSetupForm {
  localizedName: string;
  localizedDescription: string;
  status?: boolean;
}
