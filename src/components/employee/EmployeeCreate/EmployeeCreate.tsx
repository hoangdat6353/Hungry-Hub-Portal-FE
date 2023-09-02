import { LanguageCode } from '@app/constants/enums/common';
import { RouterPaths } from '@app/constants/enums/routerPaths';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as S from './EmployeeCreate.styles';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { InputTextField } from '@app/components/input/InputTextField/InputTextField';
import { Col, Row, Select } from 'antd';
import { InputTextAreaField } from '@app/components/input/InputTextAreaField/InputTextAreaField';
import { SwitchButtonCommon } from '@app/components/switch/ToggleButton/SwitchButtonCommon';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { InputTypeEnum } from '@app/constants/enums/inputType';
import { doCreateProduct } from '@app/store/slices/productSlice';
import { uploadProductImage } from '@app/api/product.api';
import { doGetAllCategories } from '@app/store/slices/categorySlice';
import { TableData } from '@app/components/tables/BasicTable/BasicTable';
import { ICategoryModel } from '@app/domain/CategoryModel';
import { CreateEmployeeRequest } from '@app/domain/EmployeeModel';
import { DatePicker } from 'antd';
import { doCreateEmployee } from '@app/store/slices/userSlice';
import moment from 'moment';

interface IFileCustoms extends FileList {
  originFileObj: File;
}

export enum EmployeePosition {
  CASHIER = 'THU NGÂN',
  KITCHEN = 'BẾP',
  BARTENDER = 'PHA CHẾ',
  DELIVERY = 'GIAO HÀNG',
}

export const APPLICATION_IMAGES = 'image/png,image/jpeg';

export const CreateEmployeeComponent: React.FC = () => {
  const categories = useAppSelector((state) => state?.category?.categories);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [fileValue, setFile] = useState<File>();
  const [dateOfBirthMoment, setDateOfBirthMoment] = useState<moment.Moment>();
  const [categoriesData, setCategoryData] = useState<TableData<ICategoryModel>>({
    data: categories,
    loading: true,
  });
  const { Option } = Select;

  const [isLoading, setLoading] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [dateHired, setDateHired] = useState<string>('');

  const handleSubmit = (values: CreateEmployeeRequest) => {
    setLoading(true);
    const requestParam: CreateEmployeeRequest = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: dateOfBirth,
      dateHired: dateHired,
      phone: values.phone,
      position: values.position,
      address: values.address,
      nationalID: values.nationalID,
    };

    dispatch(doCreateEmployee(requestParam))
      .unwrap()
      .then((res) => {
        notificationController.success({ message: 'Tạo nhân viên thành công !' });
        navigate(`${RouterPaths.PATH}${RouterPaths.EMPLOYEE_MANAGEMENT}${RouterPaths.PATH}${RouterPaths.LIST}`);
      })
      .catch((err) => {
        notificationController.error({ message: err.message });
        setLoading(false);
      });
  };

  const handleCancel = () => {
    navigate(`${RouterPaths.PATH}${RouterPaths.EMPLOYEE_MANAGEMENT}${RouterPaths.PATH}${RouterPaths.LIST}`);
  };

  const handleDateOfBirthChange = (date: moment.Moment | null) => {
    setDateOfBirthMoment(date as moment.Moment);
    if (date) {
      const minBirthDate = moment().subtract(18, 'years');

      if (date.isBefore(minBirthDate)) {
        const formattedDate = date.format('DD/MM/YYYY');
        setDateOfBirth(formattedDate);
      } else {
        notificationController.error({ message: 'Nhân viên phải từ 18 tuổi trở lên.' });
      }
    } else {
      setDateOfBirth('');
    }
  };

  const handleDateHiredChange = (date: moment.Moment | null) => {
    if (date) {
      if (date.isSameOrAfter(dateOfBirthMoment)) {
        const formattedDate = date.format('DD/MM/YYYY');
        setDateHired(formattedDate);
      } else {
        notificationController.error({ message: 'Ngày vào làm không được sớm hơn ngày sinh.' });
      }
    } else {
      setDateHired('');
    }
  };

  return (
    <S.Container>
      <S.FormDiv>
        <BaseForm layout="vertical" onFinish={handleSubmit}>
          <InputTextField
            name="email"
            label={'Email nhân viên'}
            rules={[
              { required: true, message: t('common.requiredField') },
              {
                type: 'email',
                message: 'Email không hợp lệ',
              },
            ]}
            placeholder={'Nhập email nhân viên'}
            type={InputTypeEnum.EMAIL}
          ></InputTextField>
          <InputTextField
            name="firstName"
            label={'Tên nhân viên'}
            rules={[{ required: true, message: t('common.requiredField') }]}
            placeholder={'Nhập tên nhân viên'}
          ></InputTextField>
          <InputTextField
            name="lastName"
            label={'Họ nhân viên'}
            rules={[{ required: true, message: t('common.requiredField') }]}
            placeholder={'Nhập họ nhân viên'}
          ></InputTextField>
          <S.Title>{'Ngày sinh nhân viên'}</S.Title>
          <DatePicker
            name="dateOfBirth"
            placeholder={'Chọn ngày sinh'}
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
            onChange={(e) => handleDateOfBirthChange(e)}
          ></DatePicker>
          <InputTextField
            name="nationalID"
            label={'Số CMND/CCCD'}
            rules={[{ required: true, message: t('common.requiredField') }]}
            placeholder={'Nhập số CMND/CCCD'}
          ></InputTextField>
          <BaseForm.Item
            name="position"
            label={'Vị trí làm việc'}
            rules={[{ required: true, message: t('common.requiredField') }]}
          >
            <Select placeholder={'Chọn vị trí của nhân viên'}>
              {Object.values(EmployeePosition).map((value) => (
                <Option key={value} value={value}>
                  {value}
                </Option>
              ))}
            </Select>
          </BaseForm.Item>
          <S.Title>{'Ngày vào làm'}</S.Title>
          <DatePicker
            name="dateHired"
            placeholder={'Chọn ngày vào làm'}
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
            onChange={(e) => handleDateHiredChange(e)}
          ></DatePicker>
          <InputTextField
            name="phone"
            label={'Số điện thoại'}
            rules={[{ required: true, message: t('common.requiredField') }]}
            placeholder={'Nhập số điện thoại nhân viên'}
          ></InputTextField>
          <InputTextAreaField
            name="address"
            label={'Địa chỉ nhà'}
            row={5}
            placeholder={'Nhập địa chỉ nhà'}
            defaultValue=""
          ></InputTextAreaField>
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <S.WrapperButton>
                <CommonButton type="default" title={'Hủy'} onClick={handleCancel}></CommonButton>
                <BaseForm.Item noStyle>
                  <CommonButton type="primary" htmlType="submit" loading={isLoading} title={'Tạo'}></CommonButton>
                </BaseForm.Item>
              </S.WrapperButton>
            </Col>
          </Row>
        </BaseForm>
      </S.FormDiv>
    </S.Container>
  );
};
