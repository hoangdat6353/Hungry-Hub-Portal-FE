export interface BaseResponse<T> {
  statusCode?: number;
  message?: string;
  data: T;
}

export interface BaseStatusResponse {
  isSuccess: boolean;
}

export interface BasePaginationResponse<T> {
  totalPages: number;
  pageSize?: number;
  totalItems: number;
  currentPage: number;
  items: T[];
}

export interface BasePaginationRequest {
  searchText?: string;
  page: number;
  perPage: number;
  sortBy: string;
  sortType: string;
}

export interface BaseDataEntityModel {
  id: string;
  code: string;
  localizedName: LanguageDataModel;
  created: string;
  createdBy: string;
  modified: string;
}

export interface LanguageDataModel {
  EN?: string;
  VN?: string;
}

export interface IPaginationModel {
  page: number;
  perPage: number;
  sort?: string;
  direction?: string;
}

export interface UploadFileResponseModel {
  fileId: string;
}

export interface CommonResponseModel {
  isSuccess: boolean;
}

export interface AddFilterParam extends BasePaginationRequest {
  status?: string;
}
