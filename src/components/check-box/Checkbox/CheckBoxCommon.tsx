import * as S from './CheckBoxCommon.styles';
import { Checkbox } from 'antd';

export interface CheckboxCommonProps {
  name?: string;
  label?: string;
  labelItem?: string;
  disabled?: boolean;
  className?: string;
  isChecked: boolean;
  onChange: (status: boolean) => void;
}

export const CheckBoxCommon: React.FC<CheckboxCommonProps> = (props: CheckboxCommonProps) => {
  return (
    <S.FormItem name={props.name} label={props.label ? props.label : null}>
      <Checkbox
        checked={props.isChecked}
        disabled={props.disabled}
        onChange={() => {
          props.onChange(!props.isChecked);
        }}
      />
      {props.labelItem ? <span>{props.labelItem}</span> : <></>}
    </S.FormItem>
  );
};
