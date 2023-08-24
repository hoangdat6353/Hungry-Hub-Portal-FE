import { ProductList } from '@app/components/product/ProductList/ProductList';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';

const ProductListPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{'Quản lý Món ăn'}</PageTitle>
      <ProductList />
    </>
  );
};

export default ProductListPage;
