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

export interface ProductCreateBody {
  localizedName: LanguageDataModel;
  localizedDescription: LanguageDataModel;
  status: ProductStatus;
}

export interface CreateProductResponse {
  status: boolean;
  Product: IProductModel;
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
