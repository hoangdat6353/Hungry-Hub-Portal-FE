import { CreateEmployeeComponent } from '@app/components/employee/EmployeeCreate/EmployeeCreate';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';

const CreateEmployeePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{'Tạo danh mục'}</PageTitle>
      <CreateEmployeeComponent />
    </>
  );
};

export default CreateEmployeePage;
