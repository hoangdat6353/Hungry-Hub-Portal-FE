import React from 'react';
import {
  CompassOutlined,
  DashboardOutlined,
  FormOutlined,
  HomeOutlined,
  LayoutOutlined,
  LineChartOutlined,
  TableOutlined,
  UserOutlined,
  BlockOutlined,
  SettingOutlined,
  BarsOutlined,
  FolderOpenOutlined,
  CoffeeOutlined,
  FileOutlined,
  FileTextOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { ReactComponent as NftIcon } from '@app/assets/icons/nft-icon.svg';
import { PieChart } from '@app/components/common/charts/PieChart';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'Thống kê tổng quan',
    key: 'nft-dashboard',
    // TODO use path variable
    url: '/',
    icon: <DashboardOutlined />,
  },
  {
    title: 'Quản lý Người dùng',
    key: 'user-management',
    url: '/user/list',
    icon: <UserOutlined />,
  },
  {
    title: 'Quản lý Nhân viên',
    key: 'employee-management',
    url: '/employee/list',
    icon: <TeamOutlined />,
  },
  {
    title: 'Quản lý Món ăn',
    key: 'product-management',
    url: '/product/list',
    icon: <CoffeeOutlined />,
  },
  {
    title: 'Quản lý Danh mục',
    key: 'category-management',
    url: '/category/list',
    icon: <FolderOpenOutlined />,
  },
  {
    title: 'Quản lý Đơn hàng',
    key: 'order-management',
    url: '/order/list',
    icon: <FileTextOutlined />,
  },
];
