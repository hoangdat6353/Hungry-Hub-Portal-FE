import { useTranslation } from 'react-i18next';
import * as S from './CreateUser.styles';
import { InputTextField } from '@app/components/input/InputTextField/InputTextField';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { SwitchButtonCommon } from '@app/components/switch/ToggleButton/SwitchButtonCommon';
import { CheckBoxCommon } from '@app/components/check-box/Checkbox/CheckBoxCommon';
import { RouterPaths } from '@app/constants/enums/routerPaths';
import { useNavigate } from 'react-router-dom';
import { GroupUserEnum } from '@app/constants/enums/groupUser';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doCreateUser } from '@app/store/slices/userSlice';
import { notificationController } from '@app/controllers/notificationController';
import { CopyFilled } from '@ant-design/icons';
import { copyToClipBoard, generatePassword } from '@app/utils/utils';
import { useEffectOnce } from '@app/hooks/customeHooks';

interface ICreateUserRequest {
  email: string;
  enabled: boolean;
  groupName: string;
  password: string;
}

export const CreateUserComponent: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [formValue, setValueForm] = useState<ICreateUserRequest>({
    email: '',
    enabled: false,
    groupName: '',
    password: '',
  });
  const [form] = BaseForm.useForm();

  const handleSubmit = (values: ICreateUserRequest) => {
    setLoading(true);
    const requestParam = {
      ...values,
      enabled: isDisabled,
      groupName: isChecked ? GroupUserEnum.ADMIN : GroupUserEnum.USER,
    };

    dispatch(doCreateUser(requestParam))
      .unwrap()
      .then((res) => {
        notificationController.success({ message: res.isSuccess });

        navigate(`${RouterPaths.PATH + RouterPaths.USER_MANAGEMENT + RouterPaths.PATH + RouterPaths.LIST}`);
      })
      .catch((err) => {
        notificationController.error({ message: err.message });
        setLoading(false);
      });
  };

  const handleCancel = () => {
    navigate(`${RouterPaths.PATH + RouterPaths.USER_MANAGEMENT + RouterPaths.PATH + RouterPaths.LIST}`);
  };

  const handleCopy = (text: string) => {
    copyToClipBoard(text).then((success) => {
      if (success) {
        notificationController.success({ message: t('common.copied') });
      }
    });
  };

  const fetchUsers = useCallback(async () => {
    setValueForm({
      password: await generatePassword(12),
      email: '',
      enabled: false,
      groupName: '',
    });
    form.resetFields();
  }, [dispatch, form]);

  useEffectOnce(() => {
    fetchUsers();
  });

  return (
    <S.Container>
      <S.FormDiv>
        <BaseForm form={form} layout="vertical" onFinish={handleSubmit} initialValues={formValue}>
          <InputTextField
            name="email"
            label={t('auth.email')}
            rules={[
              { required: true, message: t('common.requiredField') },
              {
                type: 'email',
                message: t('common.notValidEmail'),
              },
            ]}
            placeholder={t('auth.inputEmail')}
          ></InputTextField>
          <Row>
            <Col span={22}>
              <InputTextField
                label={t('auth.password')}
                name="password"
                rules={[{ required: true, message: t('common.requiredField') }]}
                placeholder={t('auth.inputPassword')}
                disabled={true}
              ></InputTextField>
            </Col>
            <Col span={2}>
              <S.ButtonInput>
                <CommonButton type="default" title={<CopyFilled />} onClick={() => handleCopy(formValue.password)} />
              </S.ButtonInput>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <S.SwitchButton>
                <SwitchButtonCommon
                  name="enabled"
                  label={t('users.userTable.status')}
                  isChecked={isDisabled}
                  onChange={function (status: boolean): void {
                    setDisabled(status);
                  }}
                />
              </S.SwitchButton>
            </Col>
            <Col span={12}>
              <S.ButtonWrapper>
                <CheckBoxCommon
                  name="groupName"
                  labelItem="Admin User"
                  isChecked={isChecked}
                  onChange={function (status: boolean): void {
                    setChecked(status);
                  }}
                />
              </S.ButtonWrapper>
            </Col>
          </Row>
          <Row>
            <Col span={12} />
            <Col span={12}>
              <S.WrapperButton>
                <CommonButton type="default" title={t('common.cancel')} onClick={handleCancel} />
                <BaseForm.Item noStyle>
                  <CommonButton type="primary" htmlType="submit" loading={isLoading} title={t('common.save')} />
                </BaseForm.Item>
              </S.WrapperButton>
            </Col>
          </Row>
        </BaseForm>
      </S.FormDiv>
    </S.Container>
  );
};
