import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { LanguageCode } from '@app/constants/common';
import { RouterPaths } from '@app/constants/enums/routerPaths';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { mapStringValueToLocalized } from '@app/utils/utils';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './ProductEdit.styles';
import { InputTextField } from '@app/components/input/InputTextField/InputTextField';
import { Col, Row } from 'antd';
import { InputTextAreaField } from '@app/components/input/InputTextAreaField/InputTextAreaField';
import { SwitchButtonCommon } from '@app/components/switch/ToggleButton/SwitchButtonCommon';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { BenefitSetupForm, BenefitStatus, BenefitUpdateBody } from '@app/domain/ProductModel';
import { doUpdateBenefit, getBenefitById } from '@app/store/slices/benefitSlice';

export const EditProductComponent: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isChecked, setChecked] = useState<boolean>(true);
  const [formValue, setFormValue] = useState<BenefitSetupForm>({
    localizedDescription: '',
    localizedName: '',
    status: true,
  });
  const [form] = BaseForm.useForm();

  const handleSubmit = (values: BenefitSetupForm) => {
    setLoading(false);
    const data: BenefitUpdateBody = {
      localizedName: mapStringValueToLocalized(values.localizedName, LanguageCode.EN),
      status: values.status ? BenefitStatus.ENABLED : BenefitStatus.DISABLED,
      localizedDescription: mapStringValueToLocalized(values.localizedDescription as string, LanguageCode.EN),
    };
    dispatch(doUpdateBenefit({ data, id: id as string }))
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

  const fetchBenefit = useCallback(() => {
    if (id) {
      dispatch(getBenefitById(id))
        .unwrap()
        .then((res) => {
          setChecked(res.status === BenefitStatus.ENABLED);
          setFormValue({
            localizedName: res.localizedName.EN as string,
            status: res.status === BenefitStatus.ENABLED,
            localizedDescription: res.localizedDescription.EN as string,
          });
          form.resetFields();
        })
        .catch((err) => {
          notificationController.error({ message: err.message });
          navigate(`${RouterPaths.PATH}${RouterPaths.BENEFIT_MANAGEMENT}${RouterPaths.PATH}${RouterPaths.LIST}`);
        });
    }
  }, [dispatch, form, id, navigate]);

  useEffect(() => {
    fetchBenefit();
  }, [fetchBenefit]);

  return (
    <S.Container>
      <S.FormDiv>
        <BaseForm form={form} layout="vertical" onFinish={handleSubmit} initialValues={formValue}>
          <InputTextField
            name="localizedName"
            label={t('coverage.form.name')}
            rules={[{ required: true, message: t('common.requiredField') }]}
            placeholder={t('common.inputName')}
          ></InputTextField>
          <InputTextAreaField
            name="localizedDescription"
            label={t('coverage.form.description')}
            row={5}
            placeholder={t('common.inputDescription')}
            defaultValue={formValue.localizedDescription as string}
          ></InputTextAreaField>
          <S.SwitchButton>
            <SwitchButtonCommon
              name="status"
              label={t('coverage.form.status')}
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
