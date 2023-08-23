import { IUserModel, UpdateUserRequestParams } from '@app/domain/UserModel';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { BasicTable, TableData } from '@app/components/tables/BasicTable/BasicTable';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { doGetAllUser, doUpdateStatusUser } from '@app/store/slices/userSlice';
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
import { formatTimestampToDate } from '@app/utils/utils';
import { GroupUserEnum } from '@app/constants/enums/groupUser';

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
    },
    {
      title: t('users.userTable.lastLoginAt'),
      dataIndex: 'lastLoginAt',
      key: 'lastLoginAt',
      render: (_text: string, record: IUserModel) => <Row>{formatTimestampToDate(record.sessions[0]?.lastAccess)}</Row>,
      sorter: (a: IUserModel, b: IUserModel) => {
        const lastAccessA = a.sessions[0]?.lastAccess || 0;
        const lastAccessB = b.sessions[0]?.lastAccess || 0;

        return lastAccessA - lastAccessB;
      },
      defaultSortOrder: 'descend',
      showSorterTooltip: false,
    },
    {
      title: t('users.userTable.status'),
      dataIndex: 'enabled',
      key: 'enabled',
      sorter: (a: IUserModel, b: IUserModel) => Number(a.enabled) - Number(b.enabled),
      render: (_, record: IUserModel) => (
        <SwitchButtonCommon
          disabled={record.groups.some((e) => e.name === GroupUserEnum.ADMIN)}
          isChecked={record.enabled}
          onChange={(status: boolean) => {
            handelUpdateStatusUser(record.id, status);
          }}
        />
      ),
    },
    {
      title: t('users.userTable.action'),
      key: 'action',
      render: (_text: string, record: IUserModel) => (
        <Row>
          <S.Cell>
            <EditOutlined
              onClick={() => {
                handelEditUser(record.id);
              }}
            />
            <DeleteOutlined />
          </S.Cell>
        </Row>
      ),
    },
  ];

  const handelUpdateStatusUser = (id: string, value: boolean) => {
    const requestParam: UpdateUserRequestParams = {
      id: id,
      enabled: value,
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
      RouterPaths.PATH + RouterPaths.USER_MANAGEMENT + RouterPaths.PATH + RouterPaths.EDIT.replace(':id', id)
    }`;
    navigate(path);
  };

  const fetchUsers = useCallback(() => {
    dispatch(doGetAllUser())
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
        <BasicTable tableData={usersDataTable} columns={columns}></BasicTable>
      </S.ToolbarWrapper>
    </>
  );
};
