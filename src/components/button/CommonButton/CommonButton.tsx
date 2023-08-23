import * as CommonButtonStyle from './CommonButton.styles';

export interface CommonButtonProps {
  type?: string;
  htmlType?: string;
  loading?: boolean;
  title: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const CommonButton: React.FC<CommonButtonProps> = ({
  className,
  type,
  htmlType,
  loading,
  title,
  disabled,
  onClick,
}) => {
  return (
    <CommonButtonStyle.SubmitButton
      disabled={disabled ? true : false}
      onClick={onClick}
      type={type}
      htmlType={htmlType}
      loading={loading}
      className={className}
    >
      {title}
    </CommonButtonStyle.SubmitButton>
  );
};
