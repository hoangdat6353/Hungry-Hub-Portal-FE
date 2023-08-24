import { SwitchButtonCommon } from '@app/components/switch/ToggleButton/SwitchButtonCommon';
import { BasicTable, TableData, initialPagination } from '@app/components/tables/BasicTable/BasicTable';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { useMounted } from '@app/hooks/useMounted';
import { Col, Modal, Row, Select, Space } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './ProductList.styles';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { notificationController } from '@app/controllers/notificationController';
import { RouterPaths } from '@app/constants/enums/routerPaths';
import { useNavigate } from 'react-router-dom';
import { ProductQueryParams, ProductSortBy, ProductStatus, IProductModel } from '@app/domain/ProductModel';
import { doGetAllProducts } from '@app/store/slices/productSlice';

export const ProductList: React.FC = () => {
  const products = useAppSelector((state) => state?.product?.products);
  const { isMounted } = useMounted();
  const { t } = useTranslation();
  const { confirm } = Modal;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [productsData, setProductData] = useState<TableData<IProductModel>>({
    data: products,
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

  const fetchUsers = useCallback(() => {
    dispatch(doGetAllProducts())
      .unwrap()
      .catch((error: any) => {
        setProductData({
          data: [],
          loading: true,
        });
        notificationController.error({ message: error.message });
      });
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setProductData({
      data: products,
      loading: products.length == 0,
    });
  }, [products]);

  const showConfirm = (id: string) => {
    confirm({
      title: 'Xóa món ăn',
      icon: <ExclamationCircleOutlined />,
      content: 'Thao tác này sẽ xóa món ăn khỏi hệ thống. Bạn có chắc về hành động này?',
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

  const columns: ColumnsType<IProductModel> = [
    {
      title: 'ID',
      dataIndex: 'index',
      key: 'index',
      render: (_text: string, _, index: number) => index + 1,
      align: 'center',
    },
    {
      title: 'Tên món ăn',
      dataIndex: 'name',
      key: 'name',
      render: (_text) => _text || '',
      sorter: (a: IProductModel, b: IProductModel) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: 'Thể loại',
      dataIndex: 'category',
      key: 'category',
      render: (_text, record) => record.category.name || '',
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      key: 'price',
      render: (_text) => _text || '',
    },
    {
      title: 'Số lượng tồn kho',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_text) => _text || '',
    },
    {
      title: 'Số lượng đã bán',
      dataIndex: 'sold',
      key: 'sold',
      render: (_text) => _text || '',
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      key: 'unit',
      render: (_text) => _text || '',
    },
    {
      title: 'Bán chạy',
      dataIndex: 'bestSeller',
      key: 'bestSeller',
      sorter: (a: IProductModel, b: IProductModel) => Number(a.isBestSeller) - Number(b.isBestSeller),
      showSorterTooltip: false,
      render: (_, record: IProductModel) => (
        <SwitchButtonCommon
          isChecked={record.isBestSeller}
          onChange={(status: boolean) => {
            handelUpdateStatusUser(record.id, status, record.isPopular);
          }}
        />
      ),
    },
    {
      title: 'Nổi bật',
      dataIndex: 'popular',
      key: 'popular',
      sorter: (a: IProductModel, b: IProductModel) => Number(a.isPopular) - Number(b.isPopular),
      showSorterTooltip: false,
      render: (_, record: IProductModel) => (
        <SwitchButtonCommon
          isChecked={record.isPopular}
          onChange={(status: boolean) => {
            handelUpdateStatusUser(record.id, record.isBestSeller, status);
          }}
        />
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_text, record) => {
        return (
          <Space>
            <S.ButtonSection>
              <EditOutlined className="edit-icon" onClick={() => handelEditUser(record.id)} />
              <DeleteOutlined className="delete-icon" onClick={() => showConfirm(record.id)} />
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
        <Col span={4}>
          <CommonButton
            type="primary"
            htmlType="default"
            title={t('common.createNew')}
            onClick={() => {
              navigate(`${RouterPaths.PATH + RouterPaths.USER_MANAGEMENT + RouterPaths.PATH + RouterPaths.CREATE}`);
            }}
          />
        </Col>
      </Row>
      <S.ToolbarWrapper>
        <BasicTable tableData={productsData} columns={columns}></BasicTable>
      </S.ToolbarWrapper>
    </>
  );
};
