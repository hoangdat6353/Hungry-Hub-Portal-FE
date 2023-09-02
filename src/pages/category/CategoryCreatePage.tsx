import { CreateCategoryComponent } from '@app/components/category/CategoryCreate/CategoryCreate';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';

const CreateCategoryPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{'Tạo danh mục'}</PageTitle>
      <CreateCategoryComponent />
    </>
  );
};

export default CreateCategoryPage;
