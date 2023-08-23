import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { UserList } from '@app/components/user/UserList/UserList';

const UserManagementPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('pageTitle.userManagement')}</PageTitle>
      <UserList />
    </>
  );
};

export default UserManagementPage;
