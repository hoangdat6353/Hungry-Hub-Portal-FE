import { useTranslation } from 'react-i18next';
import * as S from './EditUser.styles';
import { InputTextField } from '@app/components/input/InputTextField/InputTextField';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { SwitchButtonCommon } from '@app/components/switch/ToggleButton/SwitchButtonCommon';
import { CheckBoxCommon } from '@app/components/check-box/Checkbox/CheckBoxCommon';
import { RouterPaths } from '@app/constants/enums/routerPaths';
import { useNavigate, useParams } from 'react-router-dom';
import { copyToClipBoard, generatePassword } from '@app/utils/utils';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { GroupUserEnum } from '@app/constants/enums/groupUser';
import { notificationController } from '@app/controllers/notificationController';
import { CopyFilled } from '@ant-design/icons';
import { UpdateUserRequestParams } from '@app/domain/UserModel';

interface IEditUserRequest {
  email: string;
  enabled: boolean;
  groupName: string;
  password: string;
}

export const EditUserComponent: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [formValue, setValueForm] = useState<IEditUserRequest>({
    email: '',
    enabled: false,
    groupName: '',
    password: '',
  });
  const [form] = BaseForm.useForm();

  const handleSubmit = (values: IEditUserRequest) => {
    setLoading(true);
    if (id) {
      const requestParam: UpdateUserRequestParams = {
        id: id,
        enabled: values.enabled,
        groupName: isChecked ? GroupUserEnum.ADMIN : GroupUserEnum.USER,
        password: values.password,
      };

      // dispatch(doUpdateUser(requestParam))
      //   .unwrap()
      //   .then(() => {
      //     notificationController.success({ message: t('common.successfully') });

      //     navigate(`${RouterPaths.PATH + RouterPaths.USER_MANAGEMENT + RouterPaths.PATH + RouterPaths.LIST}`);
      //   })
      //   .catch((err) => {
      //     notificationController.error({ message: err.message });
      //     setLoading(false);
      //   });
    }
  };

  const handleCancel = () => {
    navigate(`${RouterPaths.PATH + RouterPaths.USER_MANAGEMENT + RouterPaths.PATH + RouterPaths.LIST}`);
  };

  const handleGeneratePassword = async () => {
    const password = await generatePassword(12);

    setValueForm({ ...formValue, password: password });

    form.resetFields();
  };

  const fetchUsers = useCallback(() => {
    if (id) {
      // dispatch(doGetUserById(id))
      //   .unwrap()
      //   .then((response) => {
      //     const isAdmin = response.groups.some((e) => e.name === GroupUserEnum.ADMIN);
      //     setChecked(isAdmin);
      //     setValueForm({
      //       email: response.email,
      //       enabled: response.enabled,
      //       groupName: isAdmin ? GroupUserEnum.ADMIN : GroupUserEnum.USER,
      //       password: '',
      //     });
      //     form.resetFields();
      //   });
    }
  }, [dispatch, id, form]);

  const handleCopy = (text: string) => {
    copyToClipBoard(text).then((success) => {
      if (success) {
        notificationController.success({ message: t('common.copied') });
      }
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <S.Container>
      <S.FormDiv>
        <S.WrapperTitle onClick={handleGeneratePassword}>
          <S.Title>{t('users.resetPassword')}</S.Title>
        </S.WrapperTitle>

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
            disabled={true}
          ></InputTextField>

          {formValue.password && (
            <Row>
              <Col span={22}>
                <InputTextField
                  label={t('auth.newPassword')}
                  name="password"
                  rules={[{ required: true, message: t('common.requiredField') }]}
                  placeholder={t('auth.inputPassword')}
                  disabled={true}
                ></InputTextField>
              </Col>
              <Col span={2}>
                <S.ButtonInput>
                  {/* <CommonButton type="default" title={<CopyFilled />} onClick={() => handleCopy(formValue.password)} /> */}
                </S.ButtonInput>
              </Col>
            </Row>
          )}

          <Row>
            <Col span={12}>
              <SwitchButtonCommon
                name="enabled"
                label={t('users.userTable.status')}
                isChecked={isDisabled}
                onChange={function (status: boolean): void {
                  setDisabled(status);
                }}
              />
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
