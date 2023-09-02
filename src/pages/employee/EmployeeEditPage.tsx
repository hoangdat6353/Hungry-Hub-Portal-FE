import { EditEmployeeComponent } from '@app/components/employee/EmployeeEdit/EmployeeEdit';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';

const EditEmployeePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{'Cập nhật nhân viên'}</PageTitle>
      <EditEmployeeComponent />
    </>
  );
};

export default EditEmployeePage;
