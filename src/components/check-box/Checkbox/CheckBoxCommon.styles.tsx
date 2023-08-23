import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import styled from 'styled-components';

export const FormItem = styled(BaseForm.Item)`
  margin-bottom: 0.75rem;
  align-items: center;
  justify-content: center;
  align-items: center;
  display: flex;

  & .ant-checkbox-inner {
    margin: 0.25rem;
  }

  & .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
  }
`;
