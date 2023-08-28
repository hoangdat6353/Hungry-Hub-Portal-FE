import { BasicTable, TableData, initialPagination } from '@app/components/tables/BasicTable/BasicTable';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { useMounted } from '@app/hooks/useMounted';
import { Col, Modal, Row, Select, Space } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './OrderList.styles';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, FundViewOutlined } from '@ant-design/icons';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { notificationController } from '@app/controllers/notificationController';
import { RouterPaths } from '@app/constants/enums/routerPaths';
import { useNavigate } from 'react-router-dom';
import { ICategoryModel } from '@app/domain/CategoryModel';
import { doGetAllCategories } from '@app/store/slices/categorySlice';
import { IOrderModel } from '@app/domain/OrderModel';
import { doGetAllOrders } from '@app/store/slices/orderSlice';
import { formatISODate } from '@app/utils/utils';

export const OrderList: React.FC = () => {
  const orders = useAppSelector((state) => state?.order?.orders);
  const { isMounted } = useMounted();
  const { t } = useTranslation();
  const { confirm } = Modal;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ordersData, setOrderData] = useState<TableData<IOrderModel>>({
    data: orders,
    loading: true,
  });

  const handelUpdateStatusUser = (id: string, isBestSeller: boolean, isPopular: boolean) => {
    // const requestParam: UpdateUserRequestParams = {
    //   id: id,
    //   enabled: isBestSeller,
    // };
    // dispatch(doUpdateStatusUser(requestParam))
    //   .unwrap()
    //   .then(() => {
    //     notificationController.success({ message: t('common.successfully') });
    //   })
    //   .catch((err: any) => {
    //     notificationController.error({ message: err.message });
    //   });
  };

  const handelEditUser = (id: string) => {
    const path = `${
      RouterPaths.PATH + RouterPaths.USER_MANAGEMENT + RouterPaths.PATH + RouterPaths.EDIT.replace(':id', id)
    }`;
    navigate(path);
  };

  const fetchOrders = useCallback(() => {
    dispatch(doGetAllOrders())
      .unwrap()
      .catch((error: any) => {
        setOrderData({
          data: [],
          loading: true,
        });
        notificationController.error({ message: error.message });
      });
  }, [dispatch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    setOrderData({
      data: orders,
      loading: orders.length == 0,
    });
  }, [orders]);

  const showConfirm = (id: string) => {
    confirm({
      title: 'Xóa đơn hàng',
      icon: <ExclamationCircleOutlined />,
      content: 'Thao tác này sẽ xóa danh mục khỏi hệ thống. Bạn có chắc về hành động này?',
      okText: 'Có',
      cancelText: 'Hủy',
      centered: true,
      onOk: () => {
        handleDeleteRow(id);
      },
    });
  };

  const handleDeleteRow = (id: string) => {
    // dispatch(doDeleteBenefit(id))
    //   .unwrap()
    //   .then(() => {
    //     notificationController.success({ message: t('common.successfully') });
    //   })
    //   .catch((err: any) => {
    //     notificationController.error({ message: err.message });
    //   });
  };

  const columns: ColumnsType<IOrderModel> = [
    {
      title: 'ID',
      dataIndex: 'index',
      key: 'index',
      render: (_text: string, _, index: number) => index + 1,
      align: 'center',
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: 'tracking_number',
      key: 'tracking_number',
      render: (_text) => _text || '',
      sorter: (a: IOrderModel, b: IOrderModel) => a.tracking_number.localeCompare(b.tracking_number),
      showSorterTooltip: false,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_text, record) => formatISODate(record.created_at) || '',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'total',
      key: 'total',
      render: (_text, record) => record.total || 0,
    },
    {
      title: 'Địa chỉ giao hàng',
      dataIndex: 'shipping_address',
      key: 'shipping_address',
      render: (_text, record) => record.shipping_address.shipping_address || '',
    },
    {
      title: 'Thời gian giao hàng mong muốn',
      dataIndex: 'delivery_time',
      key: 'delivery_time',
      render: (_text, record) => record.delivery_time || '',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_text, record) => {
        return (
          <Space>
            <S.ButtonSection>
              <FundViewOutlined className="edit-icon" onClick={() => handelEditUser(record.id)} />
            </S.ButtonSection>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Row>
        <Col span={20} />
      </Row>
      <S.ToolbarWrapper>
        <BasicTable tableData={ordersData} columns={columns}></BasicTable>
      </S.ToolbarWrapper>
    </>
  );
};
