import { InputTypeEnum } from '@app/constants/enums/inputType';
import * as S from './InputTextField.styles';
import { Rule } from 'antd/lib/form';

export interface InputTextFieldProps {
  name?: string;
  label?: string;
  placeholder?: string;
  rules: Rule[];
  disabled?: boolean;
  type?: InputTypeEnum;
  min?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string | number | readonly string[] | undefined;
}

export const InputTextField: React.FC<InputTextFieldProps> = ({
  name,
  label,
  rules,
  placeholder,
  disabled,
  type,
  min,
  onChange,
  value,
}) => {
  const renderTextInput = (type?: InputTypeEnum) => {
    switch (type) {
      case InputTypeEnum.PASSWORD:
        return <S.FormInputPassword placeholder={placeholder} disabled={disabled} />;
      case InputTypeEnum.NUMBER:
        return <S.FormInputNumber placeholder={placeholder} disabled={disabled} min={min} />;
      default:
        return (
          <S.FormInput
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            value={value}
            defaultValue={value}
          />
        );
    }
  };

  return (
    <S.FormItem name={name} label={label} rules={rules}>
      {renderTextInput(type)}
    </S.FormItem>
  );
};
