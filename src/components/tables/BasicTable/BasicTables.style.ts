import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import styled from 'styled-components';

export const FormItem = styled(BaseForm.Item)`
  margin-bottom: 0.75rem;

  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: #e6f7ff;
  }
`;
