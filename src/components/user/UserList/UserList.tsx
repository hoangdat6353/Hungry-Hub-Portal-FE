import { IUserModel, UpdateUserRequestParams, UpdateUserStatusRequest } from '@app/domain/UserModel';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { BasicTable, TableData } from '@app/components/tables/BasicTable/BasicTable';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { doGetAllUsers, doUpdateStatusUser } from '@app/store/slices/userSlice';
import { Col, Row } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './UserList.styles';
import { SwitchButtonCommon } from '@app/components/switch/ToggleButton/SwitchButtonCommon';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from '@app/constants/enums/routerPaths';
import { notificationController } from '@app/controllers/notificationController';

export const UserList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state: any) => state.user.users);
  const [usersDataTable, setUsersData] = useState<TableData<IUserModel>>({
    data: users,
    loading: true,
  });

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
      render: (_text, record) => record?.firstName + record?.lastName || '---',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (_text, record) => record?.phone || '---',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (_text, record) => record?.address || '---',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',

      render: (_, record: IUserModel) => (
        <SwitchButtonCommon
          isChecked={record.status}
          onChange={(status: boolean) => {
            handelUpdateStatusUser(record.id, status);
          }}
        />
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
      .then((res) => {
        notificationController.success({ message: 'Cập nhật trạng thái thành công' });
        setUsersData({
          ...usersDataTable,
          data: usersDataTable.data?.map((item) => {
            if (item.id === res.id) {
              return {
                ...item,
                status: value,
              };
            }

            return item;
          }),
        });
      })
      .catch((err: any) => {
        notificationController.error({ message: err.message });
      });
  };

  const handelEditUser = (id: string) => {
    const path = `${
      RouterPaths.PATH + RouterPaths.USER_MANAGEMENT + RouterPaths.PATH + RouterPaths.EDIT.replace(':id', id)
    }`;
    navigate(path);
  };

  const fetchUsers = useCallback(() => {
    dispatch(doGetAllUsers())
      .unwrap()
      .catch((error: any) => {
        setUsersData({
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
    setUsersData({
      data: users,
      loading: users.length == 0,
    });
  }, [users]);

  return (
    <>
      <Row>
        <Col span={20} />
      </Row>
      <S.ToolbarWrapper>
        <BasicTable tableData={usersDataTable} columns={columns}></BasicTable>
      </S.ToolbarWrapper>
    </>
  );
};
