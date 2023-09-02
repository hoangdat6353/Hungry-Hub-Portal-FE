import { RouterPaths } from '@app/constants/enums/routerPaths';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './OrderEdit.styles';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { InputTextField } from '@app/components/input/InputTextField/InputTextField';
import { Col, Row, Select } from 'antd';
import { InputTextAreaField } from '@app/components/input/InputTextAreaField/InputTextAreaField';
import { SwitchButtonCommon } from '@app/components/switch/ToggleButton/SwitchButtonCommon';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { InputTypeEnum } from '@app/constants/enums/inputType';
import { CreateProductRequest, UpdateProductRequest } from '@app/domain/ProductModel';
import { doCreateProduct, doGetProductById, doUpdateProduct } from '@app/store/slices/productSlice';
import { doGetAllCategories } from '@app/store/slices/categorySlice';
import { TableData } from '@app/components/tables/BasicTable/BasicTable';
import { ICategoryModel } from '@app/domain/CategoryModel';
import { doGetOrderById, doUpdateOrderStatus } from '@app/store/slices/orderSlice';
import { IOrderModel, IShippingAddress, ProductOrder, UpdateOrderStatusRequest } from '@app/domain/OrderModel';
import { formatISODate } from '@app/utils/utils';

interface IFileCustoms extends FileList {
  originFileObj: File;
}

export const APPLICATION_IMAGES = 'image/png,image/jpeg';

export interface EditOrdertForm {
  tracking_number: string;
  amount: string;
  delivery_fee: number;
  status: string;
  delivery_time: string;
  created_at?: Date;
  product: ProductOrder[];
  shipping_address: IShippingAddress;
}

const status: OrderStatus[] = [
  {
    id: '539a1a77-1b79-4a19-a504-6bea49ede32a',
    name: 'Chờ xử lý',
  },
  {
    id: '3f3dc886-bc8a-4e49-b987-28f76cb92124',
    name: 'Đã xác nhận',
  },
  {
    id: '672bea81-1849-4a13-a978-b1726e7a1ac7',
    name: 'Đang giao',
  },
  {
    id: 'e0af4878-3eec-4760-a880-460e9e3af39d',
    name: 'Đã giao',
  },
];

export interface OrderStatus {
  id: string;
  name: string;
}

export const EditOrderComponent: React.FC = () => {
  const categories = useAppSelector((state) => state?.category?.categories);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [categoriesData, setCategoryData] = useState<TableData<ICategoryModel>>({
    data: categories,
    loading: true,
  });
  const { Option } = Select;
  const { id } = useParams();
  const [form] = BaseForm.useForm();
  const [orderData, setOrderData] = useState<IOrderModel>();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isBestSeller, setIsBestSeller] = useState<boolean>(false);
  const [isPopular, setIsPopular] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>();

  const handleSubmit = (values: any) => {
    setLoading(true);
    const requestParam: UpdateOrderStatusRequest = {
      id: id as string,
      statusId: values.orderStatus,
    };

    dispatch(doUpdateOrderStatus(requestParam))
      .unwrap()
      .then((res) => {
        if (res.isSuccess) {
          notificationController.success({ message: 'Cập nhật thông tin đơn hàng thành công !' });
        }
        navigate(`${RouterPaths.PATH}${RouterPaths.ORDER_MANAGEMENT}${RouterPaths.PATH}${RouterPaths.LIST}`);
      })
      .catch((err) => {
        notificationController.error({ message: err.message });
        setLoading(false);
      });
  };

  const handleCancel = () => {
    navigate(`${RouterPaths.PATH}${RouterPaths.ORDER_MANAGEMENT}${RouterPaths.PATH}${RouterPaths.LIST}`);
  };

  const fetchOrder = useCallback(() => {
    if (id) {
      dispatch(doGetOrderById(id))
        .unwrap()
        .then((res) => {
          const matchingStatus = status.find((statusItem) => statusItem.id === res.status.id);
          setOrderStatus(matchingStatus);

          setOrderData(res);
        });
    }
  }, [dispatch, id, form, orderStatus]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return (
    <S.Container>
      {orderData && (
        <S.FormDiv>
          <BaseForm layout="vertical" onFinish={handleSubmit}>
            <BaseForm.Item>
              <InputTextField
                name="tracking_number"
                label={'Mã đơn hàng'}
                rules={[{ required: false, message: t('common.requiredField') }]}
                disabled={true}
                value={orderData?.tracking_number}
              ></InputTextField>
            </BaseForm.Item>
            {orderData?.products.map((product, index) => (
              <BaseForm.Item key={index}>
                <InputTextField
                  name={`products[${index}].name`}
                  label={`Sản phẩm #${index + 1}`}
                  rules={[{ required: false, message: t('common.requiredField') }]}
                  disabled={true}
                  value={`${product.name} - ${product.price} VND`}
                ></InputTextField>
              </BaseForm.Item>
            ))}

            <BaseForm.Item>
              <InputTextField
                name="amount"
                label={'Đơn giá'}
                rules={[{ required: false, message: t('common.requiredField') }]}
                disabled={true}
                value={orderData?.total + ' VND'}
              ></InputTextField>
            </BaseForm.Item>
            <BaseForm.Item
              name="orderStatus"
              label={'Trạng thái đơn hàng'}
              rules={[{ required: true, message: t('common.requiredField') }]}
            >
              <Select value={orderStatus?.id} defaultValue={orderStatus?.id}>
                {Object.values(status).map((value) => (
                  <Option key={value.id} value={value.id}>
                    {value.name}
                  </Option>
                ))}
              </Select>
            </BaseForm.Item>
            <BaseForm.Item>
              <InputTextField
                name="delivery_time"
                label={'Thời gian giao hàng dự kiến'}
                rules={[{ required: false, message: t('common.requiredField') }]}
                value={orderData?.delivery_time}
                disabled={true}
              ></InputTextField>
            </BaseForm.Item>

            <BaseForm.Item>
              <InputTextField
                name="create_at"
                label={'Ngày lên đơn'}
                rules={[{ required: false, message: t('common.requiredField') }]}
                value={formatISODate(orderData?.created_at)}
                disabled={true}
              ></InputTextField>
            </BaseForm.Item>

            <BaseForm.Item>
              <InputTextField
                name="shipping_address"
                label={'Địa chỉ giao hàng'}
                rules={[{ required: false, message: t('common.requiredField') }]}
                value={orderData?.shipping_address.shipping_address}
                disabled={true}
              ></InputTextField>
            </BaseForm.Item>

            <Row>
              <Col span={12}></Col>
              <Col span={12}>
                <S.WrapperButton>
                  <CommonButton type="default" title={'Hủy'} onClick={handleCancel}></CommonButton>
                  <BaseForm.Item noStyle>
                    <CommonButton
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                      title={'Cập nhật'}
                    ></CommonButton>
                  </BaseForm.Item>
                </S.WrapperButton>
              </Col>
            </Row>
          </BaseForm>
        </S.FormDiv>
      )}
    </S.Container>
  );
};
