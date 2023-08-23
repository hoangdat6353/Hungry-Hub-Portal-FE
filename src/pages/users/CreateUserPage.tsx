import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { CreateUserComponent } from '@app/components/user/CreateUser/CreateUser';

const CreateUserPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('pageTitle.userSetup')}</PageTitle>
      <CreateUserComponent />
    </>
  );
};

export default CreateUserPage;
