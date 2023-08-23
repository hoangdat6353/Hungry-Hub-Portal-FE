import React, { useEffect, useState } from 'react';
import * as S from '../Header.styles';
import { Row } from 'antd';
import { ProfileDropdown } from '../components/profileDropdown/ProfileDropdown/ProfileDropdown';
import * as D from './DesktopHeader.styles';
import { TitlePage, EnumPage } from '@app/constants/enums/pageTitleEnum';

interface DesktopHeaderProps {
  isTwoColumnsLayout: boolean;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({ isTwoColumnsLayout }) => {
  const [pageTitle, setPageTitle] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    const url = window.location.href;
    setCurrentUrl(url);
  });

  useEffect(() => {
    const urlParts = currentUrl.split('/');
    const valueUrl = urlParts[3];
    const IS_EDIT_PAGE = currentUrl.includes('edit');
    const IS_CREATE_PAGE = currentUrl.includes('create');

    switch (valueUrl) {
      case EnumPage.AUDIT:
        setPageTitle(TitlePage.AUDIT);
        break;
      case EnumPage.PARTNER:
        setPageTitle(TitlePage.PARTNER);
        break;
      case EnumPage.PRODUCT:
        setPageTitle(TitlePage.PRODUCT);
        break;
      case EnumPage.PROPOSAL:
        setPageTitle(TitlePage.PROPOSAL);
        break;
      case EnumPage.INSURER:
        setPageTitle(TitlePage.INSURER);
        break;
      case EnumPage.CATEGORY:
        setPageTitle(TitlePage.CATEGORY);
        break;
      case EnumPage.CUSTOMER:
        setPageTitle(TitlePage.CUSTOMER);
        break;
      case EnumPage.BENEFIT:
        setPageTitle(TitlePage.BENEFIT);
        break;
      case EnumPage.COVERAGE:
        setPageTitle(TitlePage.COVERAGE);
        break;
      case EnumPage.LIMIT:
        setPageTitle(TitlePage.LIMIT);
        break;
      case EnumPage.CLAUSE:
        setPageTitle(TitlePage.CLAUSE);
        break;
      case EnumPage.DOCUMENT:
        setPageTitle(TitlePage.DOCUMENT);
        break;
      case EnumPage.RELATIONSHIP:
        if (IS_EDIT_PAGE) {
          setPageTitle(TitlePage.RELATIONSHIP_EDIT);
        } else if (IS_CREATE_PAGE) {
          setPageTitle(TitlePage.RELATIONSHIP_CREATE);
        } else {
          setPageTitle(TitlePage.RELATIONSHIP);
        }
        break;
      case EnumPage.DEDUCTIBLE:
        setPageTitle(TitlePage.DEDUCTIBLE);
        break;
      case EnumPage.WAITING_PERIOD:
        setPageTitle(TitlePage.WAITING_PERIOD);
        break;
      case EnumPage.RISK:
        setPageTitle(TitlePage.RISK);
        break;
      case EnumPage.QUESTION:
        setPageTitle(TitlePage.QUESTION);
        break;
      case EnumPage.USER:
        setPageTitle(TitlePage.USER);
        break;
      default:
        setPageTitle(TitlePage.DEFAULT);
        break;
    }
  }, [currentUrl]);

  return (
    <S.ProfileColumn $isTwoColumnsLayout={isTwoColumnsLayout}>
      <Row align="middle" justify="space-between">
        <D.Text>{pageTitle}</D.Text>
        <ProfileDropdown />
      </Row>
    </S.ProfileColumn>
  );
};
