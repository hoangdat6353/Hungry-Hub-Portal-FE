import { OrderList } from '@app/components/order/OrderList/OrderList';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const OrderListPage: React.FC = () => {
  return (
    <>
      <PageTitle>{'Quản lý Đơn hàng'}</PageTitle>
      <OrderList />
    </>
  );
};

export default OrderListPage;
