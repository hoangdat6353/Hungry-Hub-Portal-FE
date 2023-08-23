import TextArea from 'antd/lib/input/TextArea';
import * as S from './InputTextAreaField.styles';
import { Rule } from 'antd/lib/form';

export interface InputTextAreaFieldProps {
  name: string;
  label: string;
  placeholder: string;
  row: number;
  rules?: Rule[];
  defaultValue?: string;
  disabled?: boolean;
}

export const InputTextAreaField: React.FC<InputTextAreaFieldProps> = ({
  name,
  label,
  row,
  defaultValue,
  rules,
  placeholder,
  disabled,
}) => {
  return (
    <S.FormItem name={name} label={label} rules={rules}>
      <S.InputsWrapper>
        <TextArea name={name} rows={row} placeholder={placeholder} defaultValue={defaultValue} disabled={disabled} />
      </S.InputsWrapper>
    </S.FormItem>
  );
};
