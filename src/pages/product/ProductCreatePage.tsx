import { CreateProductComponent } from '@app/components/product/ProductCreate/ProductCreate';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';

const CreateProductPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('pageTitle.createProduct')}</PageTitle>
      <CreateProductComponent />
    </>
  );
};

export default CreateProductPage;
