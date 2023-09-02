import { SortType } from '@app/constants/enums/common';
import { BasePaginationRequest, LanguageDataModel } from './ApiModel';

export enum OrderStatus {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

export enum OrderSortBy {
  code = 'code',
  created = 'created',
  status = 'status',
}
export interface IOrderModel {
  id: string;
  tracking_number: string;
  total: number;
  created_at: Date;
  shipping_address: IShippingAddress;
  delivery_time: string;
  products: ProductOrder[];
  status: StatusOrder;
}

export interface IShippingAddress {
  shipping_address: string;
}

export interface StatusOrder {
  id: string;
  name: string;
  serial: number;
  color: string;
}
export interface ProductOrder {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface UpdateOrderStatusRequest {
  id: string;
  statusId: string;
}

export interface UpdateOrderStatusResponse {
  id: string;
  isSuccess: boolean;
}

export interface OrderQueryParams extends BasePaginationRequest {
  status?: OrderStatus | string;
  sortBy: OrderSortBy;
  sortType: SortType;
}

export interface OrderUpdateBody {
  localizedName?: LanguageDataModel;
  localizedDescription?: LanguageDataModel;
  status?: OrderStatus;
}

export interface UpdateOrderResponse {
  status: boolean;
  Order: IOrderModel;
}

export interface OrderDeleteResponseModel {
  isSuccess: boolean;
}

export interface OrderCreateBody {
  localizedName: LanguageDataModel;
  localizedDescription: LanguageDataModel;
  status: OrderStatus;
}

export interface CreateOrderResponse {
  status: boolean;
  Order: IOrderModel;
}

export interface UpdateOrderBody {
  data: OrderUpdateBody;
  id: string;
}

export interface OrderSetupForm {
  localizedName: string;
  localizedDescription: string;
  status?: boolean;
}
