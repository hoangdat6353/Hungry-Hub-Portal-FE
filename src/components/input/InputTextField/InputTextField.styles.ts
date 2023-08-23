import styled from 'styled-components';
import { FONT_SIZE, FONT_WEIGHT, media } from '@app/styles/themes/constants';
import { InputPassword as CommonInputPassword } from '@app/components/common/inputs/InputPassword/InputPassword';
import { Input as CommonInput } from '@app/components/common/inputs/Input/Input';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { InputNumber } from '@app/components/common/inputs/InputNumber/InputNumber.styles';

export const FormTitle = styled.div`
  color: var(--primary-color);

  @media only screen and ${media.xs} {
    margin-bottom: 0.625rem;
    font-size: ${FONT_SIZE.lg};
    font-weight: ${FONT_WEIGHT.bold};
    line-height: 1.5625rem;
  }

  @media only screen and ${media.md} {
    margin-bottom: 0.875rem;
    font-size: ${FONT_SIZE.xxl};
    font-weight: ${FONT_WEIGHT.bold};
    line-height: 1.9375rem;
  }

  @media only screen and ${media.xl} {
    margin-bottom: 0.9375rem;
    font-size: ${FONT_SIZE.xxxl};
    font-weight: ${FONT_WEIGHT.extraBold};
    line-height: 2.125rem;
  }
`;

export const FormItem = styled(BaseForm.Item)`
  margin-bottom: 0.75rem;

  & .ant-form-item-control-input {
    min-height: 3.125rem;
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
`;

export const FormInput = styled(CommonInput)`
  color: var(--text-main-color);
  background: var(--white);

  & input.ant-input {
    background: var(--white);
  }
`;

export const FormInputPassword = styled(CommonInputPassword)`
  color: var(--text-main-color);
  background: var(--white);

  & input.ant-input {
    background: var(--white);
  }
`;

export const FormInputNumber = styled(InputNumber)`
  color: var(--text-main-color);
  background: var(--white);
  width: 100%;

  & input.ant-input {
    background: var(--white);
  }
`;
