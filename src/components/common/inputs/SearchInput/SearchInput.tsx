import React from 'react';
import { Spin, InputRef } from 'antd';
import { InputProps } from '../Input/Input';
import * as S from './SearchInput.styles';

interface SearchInputProps extends InputProps {
  loading?: boolean;
  filter?: React.ReactNode;
  onSearch?: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  enterButton?: React.ReactNode;
  inputPrefixCls?: string;
  iconPrefix?: React.ReactNode;
}

export const SearchInput = React.forwardRef<InputRef, SearchInputProps>(({ loading, filter, ...props }, ref) => {
  return (
    <S.SearchInput
      prefixIcon={props.iconPrefix}
      ref={ref}
      prefix={props.iconPrefix ? props.iconPrefix : null}
      {...(filter && {
        suffix: (
          <S.Space align="center">
            {loading && <Spin size="small" />}
            {filter}
          </S.Space>
        ),
      })}
      {...props}
    />
  );
});
