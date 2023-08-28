import { EmployeeList } from '@app/components/employee/EmployeeList/EmployeeList';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const EmployeeListPage: React.FC = () => {
  return (
    <>
      <PageTitle>{'Quản lý Nhân viên'}</PageTitle>
      <EmployeeList />
    </>
  );
};

export default EmployeeListPage;
