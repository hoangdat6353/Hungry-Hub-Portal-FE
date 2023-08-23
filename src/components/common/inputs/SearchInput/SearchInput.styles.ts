import styled, { css } from 'styled-components';
import { Space as AntSpace, Input } from 'antd';
import { FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';

const { Search } = Input;

export interface SearchInputProps {
  prefixIcon?: boolean;
}

export const SearchInput = styled(Search)<SearchInputProps>`
  & .ant-input-prefix {
    margin: 0.5rem;
  }

  & .ant-input-search-button {
    height: 2.8rem;

    ${(props) => {
      if (props.prefixIcon) {
        return css`
          height: 3.54875rem;
        `;
      }
    }}
    box-shadow: none;
    height: 50px;
    padding-bottom: 11px;
  }

  &.ant-input-search-large .ant-input-search-button {
    height: 4.36125rem;
  }

  & input {
    font-weight: 400;
    background-color: var(--background-color);

    @media only screen {
      font-size: 0.9rem;
    }

    &::placeholder {
      font-weight: 400;
    }
    height: 50px;
  }

  .ant-input-group-addon {
    min-width: 5.5rem;
    color: var(--primary-color);
    font-weight: ${FONT_WEIGHT.semibold};
    font-size: ${FONT_SIZE.lg};
  }

  .ant-input-search-button {
    &.ant-btn .anticon {
      color: var(--primary-color);
    }
    width: 100%;
    background-color: rgba(1, 80, 154, 0.05);
    border: 1px solid var(--border-color);
    color: var(--primary-color);
  }
`;

export const Space = styled(AntSpace)`
  & > .ant-space-item:last-of-type {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
