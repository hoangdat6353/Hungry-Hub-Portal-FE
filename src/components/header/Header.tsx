import React from 'react';
import { DesktopHeader } from './layouts/DesktopHeader';

interface HeaderProps {
  toggleSider: () => void;
  isSiderOpened: boolean;
  isTwoColumnsLayout: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isTwoColumnsLayout }) => {
  return <DesktopHeader isTwoColumnsLayout={isTwoColumnsLayout} />;
};
