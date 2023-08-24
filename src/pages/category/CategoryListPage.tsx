import { CategoryList } from '@app/components/category/CategoryList/CategoryList';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const CategoryListPage: React.FC = () => {
  return (
    <>
      <PageTitle>{'Quản lý Danh mục'}</PageTitle>
      <CategoryList />
    </>
  );
};

export default CategoryListPage;
