import { URL_PATH_ORDER, URL_PATH_PRODUCT } from '@app/constants/api';
import { BaseResponse } from '@app/domain/ApiModel';
import { HttpService } from '@app/services/http.service';
import { IOrderModel, UpdateOrderStatusRequest, UpdateOrderStatusResponse } from '@app/domain/OrderModel';

export const getAllOrders = (): Promise<BaseResponse<IOrderModel[]>> => {
  const httpService = new HttpService(process.env.REACT_APP_AUTH_BASE_URL);
  const url = URL_PATH_PRODUCT + '/' + URL_PATH_ORDER;

  return httpService.get<BaseResponse<IOrderModel[]>>(url).then(({ data }) => {
    return data;
  });
};

export const getOrderById = (id: string): Promise<BaseResponse<IOrderModel>> => {
  const httpService = new HttpService(process.env.REACT_APP_BASE_URL);

  return httpService.get<BaseResponse<IOrderModel>>(`${URL_PATH_PRODUCT}/order/${id}`).then(({ data }) => {
    return data;
  });
};

export const updateOrderStatus = (
  params: UpdateOrderStatusRequest,
): Promise<BaseResponse<UpdateOrderStatusResponse>> => {
  const httpService = new HttpService(process.env.REACT_APP_BASE_URL);
  const url = URL_PATH_PRODUCT + '/' + URL_PATH_ORDER + '/' + 'order-status';

  return httpService.put<BaseResponse<UpdateOrderStatusResponse>>(url, params).then(({ data }) => {
    return data;
  });
};
