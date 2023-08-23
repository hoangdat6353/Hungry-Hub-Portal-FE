import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { EditUserComponent } from '@app/components/user/EditUser/EditUser';

const EditUserPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('pageTitle.userSetup')}</PageTitle>
      <EditUserComponent />
    </>
  );
};

export default EditUserPage;
