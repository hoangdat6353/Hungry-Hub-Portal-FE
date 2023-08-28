import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import * as S from './SiderMenu.styles';
import { sidebarNavigation, SidebarNavigationItem } from '../sidebarNavigation';
import { readUserInfo } from '@app/services/localStorage.service';

interface SiderContentProps {
  setCollapsed: (isCollapsed: boolean) => void;
}

const sidebarNavFlat = sidebarNavigation.reduce(
  (result: SidebarNavigationItem[], current) =>
    result.concat(current.children && current.children.length > 0 ? current.children : current),
  [],
);

const SiderMenu: React.FC<SiderContentProps> = ({ setCollapsed }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const userInfo = readUserInfo(); // Get user info
  const allowedKeys: string[] = [];

  if (userInfo) {
    if (userInfo.role === 'admin') {
      // Admin has access to all keys
      allowedKeys.push(...sidebarNavFlat.map((item) => item.key));
    } else if (userInfo.role === 'employee') {
      // Employee has access to specific keys
      allowedKeys.push('nft-dashboard', 'product-management', 'category-management', 'order-management');
    }
  }

  const currentMenuItem = sidebarNavFlat.find(({ url }) => allowedKeys.includes(url || ''));
  const defaultSelectedKeys = currentMenuItem ? [currentMenuItem.key] : [];

  const openedSubmenu = sidebarNavigation.find(({ children }) =>
    children?.some(({ url }) => allowedKeys.includes(url || '')),
  );
  const defaultOpenKeys = openedSubmenu ? [openedSubmenu.key] : [];

  return (
    <S.Menu
      mode="inline"
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={defaultOpenKeys}
      onClick={() => setCollapsed(true)}
      items={sidebarNavigation
        .filter((nav) => allowedKeys.includes(nav.key)) // Filter sidebarNavigation based on allowed keys
        .map((nav) => {
          const isSubMenu = nav.children?.length;

          return {
            key: nav.key,
            title: t(nav.title),
            label: isSubMenu ? t(nav.title) : <Link to={nav.url || ''}>{t(nav.title)}</Link>,
            icon: nav.icon,
            children:
              isSubMenu &&
              nav.children &&
              nav.children
                .filter((childNav) => allowedKeys.includes(childNav.key)) // Filter child items based on allowed keys
                .map((childNav) => ({
                  key: childNav.key,
                  label: <Link to={childNav.url || ''}>{t(childNav.title)}</Link>,
                  title: t(childNav.title),
                })),
          };
        })}
    />
  );
};

export default SiderMenu;
