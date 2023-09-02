import { IUserModel, UpdateUserRequestParams, UpdateUserStatusRequest } from '@app/domain/UserModel';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { BasicTable, TableData } from '@app/components/tables/BasicTable/BasicTable';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { doDeleteEmployee, doGetAllEmployee, doGetAllUsers, doUpdateStatusUser } from '@app/store/slices/userSlice';
import { Col, Row } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './EmployeeList.styles';
import { SwitchButtonCommon } from '@app/components/switch/ToggleButton/SwitchButtonCommon';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from '@app/constants/enums/routerPaths';
import { notificationController } from '@app/controllers/notificationController';
import confirm from 'antd/lib/modal/confirm';

export const EmployeeList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const employee = useAppSelector((state) => state.user.employee);
  const [employeeData, setEmployeeData] = useState<TableData<IUserModel>>({
    data: employee,
    loading: true,
  });

  const showConfirm = (id: string) => {
    confirm({
      title: 'Xóa nhân viên',
      icon: <ExclamationCircleOutlined />,
      content: 'Thao tác này sẽ xóa nhân viên khỏi hệ thống. Bạn có chắc về hành động này?',
      okText: 'Có',
      cancelText: 'Hủy',
      centered: true,
      onOk: () => {
        handleDeleteRow(id);
      },
    });
  };

  const handleDeleteRow = (id: string) => {
    dispatch(doDeleteEmployee({ id: id }))
      .unwrap()
      .then(() => {
        notificationController.success({ message: 'Xóa nhân viên thành công' });
      })
      .catch((err: any) => {
        notificationController.error({ message: err.message });
      });
  };

  const columns: ColumnsType<IUserModel> = [
    {
      title: t('users.userTable.id'),
      dataIndex: 'index',
      key: 'index',
      render: (_text: string, _, index: number) => index + 1,
    },
    {
      title: t('users.userTable.email'),
      dataIndex: 'email',
      key: 'email',
      sorter: (a: IUserModel, b: IUserModel) => a.email.localeCompare(b.email),
      showSorterTooltip: false,
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
      render: (_text, record) => record?.username || '',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (_text, record) => record?.phone || '',
    },
    {
      title: 'Ngày tháng năm sinh',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (_text, record) => record?.dateOfBirth || '',
    },
    {
      title: 'Số CMND/CCCD',
      dataIndex: 'nationID',
      key: 'nationID',
      render: (_text, record) => record?.nationalID || '',
    },
    {
      title: 'Vị trí',
      dataIndex: 'position',
      key: 'position',
      render: (_text, record) => record?.position || '',
    },
    {
      title: 'Ngày vào làm',
      dataIndex: 'dateHired',
      key: 'dateHired',
      render: (_text, record) => record?.dateHired || '',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      sorter: (a: IUserModel, b: IUserModel) => Number(a.status) - Number(b.status),
      showSorterTooltip: false,
      render: (_, record: IUserModel) => (
        <SwitchButtonCommon
          isChecked={record.status}
          onChange={(status: boolean) => {
            handelUpdateStatusUser(record.id, status);
          }}
        />
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_text: string, record: IUserModel) => (
        <Row>
          <S.Cell>
            <EditOutlined
              onClick={() => {
                handelEditUser(record.id);
              }}
            />
            <DeleteOutlined className="delete-icon" onClick={() => showConfirm(record.id)} />
          </S.Cell>
        </Row>
      ),
    },
  ];

  const handelUpdateStatusUser = (id: string, value: boolean) => {
    const requestParam: UpdateUserStatusRequest = {
      id: id,
      status: value,
    };
    dispatch(doUpdateStatusUser(requestParam))
      .unwrap()
      .then(() => {
        notificationController.success({ message: t('common.successfully') });
      })
      .catch((err: any) => {
        notificationController.error({ message: err.message });
      });
  };

  const handelEditUser = (id: string) => {
    const path = `${
      RouterPaths.PATH + RouterPaths.EMPLOYEE_MANAGEMENT + RouterPaths.PATH + RouterPaths.EDIT.replace(':id', id)
    }`;
    navigate(path);
  };

  const fetchEmployee = useCallback(() => {
    dispatch(doGetAllEmployee())
      .unwrap()
      .catch((error: any) => {
        setEmployeeData({
          data: [],
          loading: true,
        });
        notificationController.error({ message: error.message });
      });
  }, [dispatch]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  useEffect(() => {
    setEmployeeData({
      data: employee,
      loading: false,
    });
  }, [employee]);

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
              navigate(`${RouterPaths.PATH + RouterPaths.EMPLOYEE_MANAGEMENT + RouterPaths.PATH + RouterPaths.CREATE}`);
            }}
          />
        </Col>
      </Row>
      <S.ToolbarWrapper>
        <BasicTable tableData={employeeData} columns={columns}></BasicTable>
      </S.ToolbarWrapper>
    </>
  );
};
