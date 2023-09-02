import { EditOrderComponent } from '@app/components/order/OrderEdit/OrderEdit';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';

const EditOrderPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{'Cập nhật đơn hàng'}</PageTitle>
      <EditOrderComponent />
    </>
  );
};

export default EditOrderPage;
