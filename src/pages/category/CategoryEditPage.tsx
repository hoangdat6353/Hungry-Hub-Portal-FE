import { EditCategoryComponent } from '@app/components/category/CategoryEdit/CategoryEdit';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';

const EditCategoryPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{'Cập nhật danh mục'}</PageTitle>
      <EditCategoryComponent />
    </>
  );
};

export default EditCategoryPage;
