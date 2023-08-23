import React from 'react';
import { Avatar, Col, Row } from 'antd';
import { Dropdown } from '@app/components/common/Dropdown/Dropdown';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './ProfileDropdown.styles';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useTranslation } from 'react-i18next';

export const ProfileDropdown: React.FC = () => {
  const { isTablet } = useResponsive();
  const { t } = useTranslation();
  const userInfo = useAppSelector((state: any) => state.auth.userInfo);

  return (
    <Dropdown overlay={<ProfileOverlay />} trigger={['click']}>
      <S.ProfileDropdownHeader as={Row} gutter={[10, 10]} align="middle">
        <Col>
          <Avatar style={{ backgroundColor: '#f56a00' }}>{'Admin'}</Avatar>
        </Col>
        {isTablet && (
          <Col>
            <S.SubText>{'Hi, '}</S.SubText>
            <S.Text>{userInfo?.name || userInfo?.email}</S.Text>
          </Col>
        )}
      </S.ProfileDropdownHeader>
    </Dropdown>
  );
};
