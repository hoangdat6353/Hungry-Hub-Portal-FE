import { EditProductComponent } from '@app/components/product/ProductEdit/ProductEdit';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';

const EditProductPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('pageTitle.editProduct')}</PageTitle>
      <EditProductComponent />
    </>
  );
};

export default EditProductPage;
