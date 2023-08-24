import { SwitchButtonCommon } from '@app/components/switch/ToggleButton/SwitchButtonCommon';
import { BasicTable, TableData, initialPagination } from '@app/components/tables/BasicTable/BasicTable';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { useMounted } from '@app/hooks/useMounted';
import { Col, Modal, Row, Select, Space } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './CategoryList.styles';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { notificationController } from '@app/controllers/notificationController';
import { RouterPaths } from '@app/constants/enums/routerPaths';
import { useNavigate } from 'react-router-dom';
import { ProductQueryParams, ProductSortBy, ProductStatus, IProductModel } from '@app/domain/ProductModel';
import { doGetAllProducts } from '@app/store/slices/productSlice';
import { ICategoryModel } from '@app/domain/CategoryModel';
import { doGetAllCategories } from '@app/store/slices/categorySlice';

export const CategoryList: React.FC = () => {
  const categories = useAppSelector((state) => state?.category?.categories);
  const { isMounted } = useMounted();
  const { t } = useTranslation();
  const { confirm } = Modal;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [categoriesData, setCategoryData] = useState<TableData<ICategoryModel>>({
    data: categories,
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

  const fetchCategories = useCallback(() => {
    dispatch(doGetAllCategories())
      .unwrap()
      .catch((error: any) => {
        setCategoryData({
          data: [],
          loading: true,
        });
        notificationController.error({ message: error.message });
      });
  }, [dispatch]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    setCategoryData({
      data: categories,
      loading: categories.length == 0,
    });
  }, [categories]);

  const showConfirm = (id: string) => {
    confirm({
      title: 'Xóa danh mục',
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

  const columns: ColumnsType<ICategoryModel> = [
    {
      title: 'ID',
      dataIndex: 'index',
      key: 'index',
      render: (_text: string, _, index: number) => index + 1,
      align: 'center',
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (_text) => _text || '',
      sorter: (a: ICategoryModel, b: ICategoryModel) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: 'Mã danh mục',
      dataIndex: 'slug',
      key: 'slug',
      render: (_text) => _text || '',
    },
    {
      title: 'Số lượng món ăn thuộc về thể loại',
      dataIndex: 'numberOfProducts',
      key: 'numberOfProducts',
      render: (_text, record) => record.numberOfProducts || 0,
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
        <BasicTable tableData={categoriesData} columns={columns}></BasicTable>
      </S.ToolbarWrapper>
    </>
  );
};
