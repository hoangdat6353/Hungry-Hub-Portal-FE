import { Switch } from '@app/components/common/Switch/Switch';
import * as S from './SwitchButtonCommon.styles';
import { SwitchSize } from 'antd/lib/switch';

export interface SwitchButtonCommonProps {
  name?: string;
  label?: string;
  disabled?: boolean;
  size?: SwitchSize;
  className?: string;
  isChecked: boolean;
  onChange?: (status: boolean) => void;
}

export const SwitchButtonCommon: React.FC<SwitchButtonCommonProps> = ({
  name,
  label,
  disabled,
  size,
  isChecked,
  onChange,
}) => {
  return (
    <S.FormItem name={name} label={label} valuePropName="checked">
      <Switch
        disabled={disabled}
        size={size}
        checked={isChecked}
        onChange={() => {
          onChange && onChange(!isChecked);
        }}
      />
    </S.FormItem>
  );
};
