import React, { useEffect, useState } from 'react';
import * as S from '../Header.styles';
import { Button, Row } from 'antd';
import { ProfileDropdown } from '../components/profileDropdown/ProfileDropdown/ProfileDropdown';
import * as D from './DesktopHeader.styles';
import { TitlePage, EnumPage } from '@app/constants/enums/pageTitleEnum';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from '@app/constants/enums/routerPaths';
import { useEffectOnce } from '@app/hooks/customeHooks';

interface DesktopHeaderProps {
  isTwoColumnsLayout: boolean;
}

enum URL_KEY {
  EDIT = 'edit',
  CREATE = 'create',
}
enum PAGE_TITLE_FIX {
  MANAGEMENT = 'Quản lý',
  CREATE = 'Tạo',
  EDIT = 'Cập nhật',
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({ isTwoColumnsLayout }) => {
  const [pageTitle, setPageTitle] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [isManagementPage, setIsManagementPage] = useState<boolean>(true);
  const [urlValue, setUrlValue] = useState('');
  const navigate = useNavigate();

  const getPageTitle = (value: string) => {
    const IS_EDIT_PAGE = currentUrl.includes(URL_KEY.EDIT);
    const IS_CREATE_PAGE = currentUrl.includes(URL_KEY.CREATE);

    if (IS_CREATE_PAGE) {
      setIsManagementPage(false);

      return PAGE_TITLE_FIX.CREATE + ' ' + value;
    } else if (IS_EDIT_PAGE) {
      setIsManagementPage(false);

      return PAGE_TITLE_FIX.EDIT + ' ' + value;
    } else {
      setIsManagementPage(true);

      return PAGE_TITLE_FIX.MANAGEMENT + ' ' + value;
    }
  };

  useEffect(() => {
    const url = window.location.href;
    setCurrentUrl(url);
  });

  useEffect(() => {
    const urlParts = currentUrl.split('/');
    const valueUrl = urlParts[3];
    setUrlValue(valueUrl);

    switch (valueUrl) {
      case EnumPage.PRODUCT:
        setPageTitle(getPageTitle(TitlePage.PRODUCT));
        break;
      case EnumPage.CATEGORY:
        setPageTitle(getPageTitle(TitlePage.CATEGORY));
        break;
      case EnumPage.USER:
        setPageTitle(getPageTitle(TitlePage.USER));
        break;
      case EnumPage.ORDER:
        setPageTitle(getPageTitle(TitlePage.ORDER));
        break;
      case EnumPage.EMPLOYEE:
        setPageTitle(getPageTitle(TitlePage.EMPLOYEE));
        break;
      default:
        setPageTitle(TitlePage.DEFAULT);
        break;
    }
  }, [currentUrl]);

  return (
    <S.ProfileColumn $isTwoColumnsLayout={isTwoColumnsLayout}>
      <Row align="middle" justify="space-between">
        <Button
          hidden={isManagementPage}
          onClick={() => {
            navigate(RouterPaths.PATH + urlValue + RouterPaths.PATH + RouterPaths.LIST);
          }}
        >
          <ArrowLeftOutlined></ArrowLeftOutlined>
        </Button>
        <D.Text style={{ fontFamily: 'Arial, sans-serif' }}>{pageTitle}</D.Text>
        <ProfileDropdown />
      </Row>
    </S.ProfileColumn>
  );
};
