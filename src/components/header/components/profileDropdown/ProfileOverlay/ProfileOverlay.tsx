import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as S from './ProfileOverlay.styles';
import { DropdownMenu } from '@app/components/header/Header.styles';
import { RouterPaths } from '@app/constants/enums/routerPaths';

export const ProfileOverlay: React.FC = ({ ...props }) => {
  const { t } = useTranslation();

  return (
    <DropdownMenu selectable={false} {...props}>
      <S.MenuItem key={0}>
        <S.Text>
          <Link to={RouterPaths.LOGOUT}>{'Đăng xuất'}</Link>
        </S.Text>
      </S.MenuItem>
    </DropdownMenu>
  );
};
