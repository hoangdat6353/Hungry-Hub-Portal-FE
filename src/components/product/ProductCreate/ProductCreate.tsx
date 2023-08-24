import { LanguageCode } from '@app/constants/enums/common';
import { RouterPaths } from '@app/constants/enums/routerPaths';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { mapStringValueToLocalized } from '@app/utils/utils';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as S from './ProductCreate.styles';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { InputTextField } from '@app/components/input/InputTextField/InputTextField';
import { Col, Row } from 'antd';
import { InputTextAreaField } from '@app/components/input/InputTextAreaField/InputTextAreaField';
import { SwitchButtonCommon } from '@app/components/switch/ToggleButton/SwitchButtonCommon';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { BenefitCreateBody, BenefitSetupForm, BenefitStatus } from '@app/domain/ProductModel';
import { doCreateBenefit } from '@app/store/slices/benefitSlice';

export const CreateProductComponent: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isChecked, setChecked] = useState<boolean>(false);

  const handleSubmit = (values: BenefitSetupForm) => {
    setLoading(true);
    const dataBody: BenefitCreateBody = {
      localizedName: mapStringValueToLocalized(values.localizedName, LanguageCode.EN),
      status: values.status ? BenefitStatus.ENABLED : BenefitStatus.DISABLED,
      localizedDescription: mapStringValueToLocalized(values.localizedDescription as string, LanguageCode.EN),
    };

    dispatch(doCreateBenefit(dataBody))
      .unwrap()
      .then(() => {
        notificationController.success({ message: t('common.successfully') });
        navigate(`${RouterPaths.PATH}${RouterPaths.BENEFIT_MANAGEMENT}${RouterPaths.PATH}${RouterPaths.LIST}`);
      })
      .catch((err) => {
        notificationController.error({ message: err.message });
        setLoading(false);
      });
  };

  const handleCancel = () => {
    navigate(`${RouterPaths.PATH}${RouterPaths.BENEFIT_MANAGEMENT}${RouterPaths.PATH}${RouterPaths.LIST}`);
  };

  return (
    <S.Container>
      <S.FormDiv>
        <BaseForm layout="vertical" onFinish={handleSubmit}>
          <InputTextField
            name="localizedName"
            label={t('benefit.form.name')}
            rules={[{ required: true, message: t('common.requiredField') }]}
            placeholder={t('common.inputName')}
          ></InputTextField>
          <InputTextAreaField
            name="localizedDescription"
            label={t('benefit.form.description')}
            row={5}
            placeholder={t('common.inputDescription')}
            defaultValue=""
          ></InputTextAreaField>
          <S.SwitchButton>
            <SwitchButtonCommon
              name="status"
              label={t('benefit.form.status')}
              isChecked={isChecked}
              onChange={(status) => {
                setChecked(status);
              }}
            ></SwitchButtonCommon>
          </S.SwitchButton>
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <S.WrapperButton>
                <CommonButton type="default" title={t('common.cancel')} onClick={handleCancel}></CommonButton>
                <BaseForm.Item noStyle>
                  <CommonButton
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    title={t('common.save')}
                  ></CommonButton>
                </BaseForm.Item>
              </S.WrapperButton>
            </Col>
          </Row>
        </BaseForm>
      </S.FormDiv>
    </S.Container>
  );
};
