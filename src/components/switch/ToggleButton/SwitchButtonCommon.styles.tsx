import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { FONT_SIZE } from '@app/styles/themes/constants';
import styled from 'styled-components';

export const FormItem = styled(BaseForm.Item)`
  margin-bottom: 0.75rem;
  width: 100%;

  & .ant-form-item-control-input {
    min-height: 3.125rem;
  }

  & .ant-form-item-row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }

  & .ant-form-item-label {
    width: 4rem;
    padding: 0;
  }

  & .ant-form-item-explain-error {
    font-size: ${FONT_SIZE.xs};
  }

  & label {
    color: var(--primary-color);
    font-size: ${FONT_SIZE.xs};
    line-height: 1.25rem;
  }

  &.ant-form-item-has-feedback .ant-input-affix-wrapper .ant-input-suffix {
    padding-right: 1.5rem;
  }

  .ant-switch-checked {
    background: var(--success-color);
  }

  .ant-switch-checked:focus {
    box-shadow: none;
  }
`;
