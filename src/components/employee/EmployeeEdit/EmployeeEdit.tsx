import { RouterPaths } from '@app/constants/enums/routerPaths';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './EmployeeEdit.styles';
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
import { DatePicker } from 'antd';
import { doCreateEmployee, doGetUserById, doUpdateEmployee } from '@app/store/slices/userSlice';
import moment from 'moment';
import { UpdateEmployeeRequest } from '@app/domain/EmployeeModel';
import { CopyFilled } from '@ant-design/icons';
import { copyToClipBoard } from '@app/utils/utils';

interface IFileCustoms extends FileList {
  originFileObj: File;
}

export enum EmployeePosition {
  CASHIER = 'THU NGÂN',
  KITCHEN = 'BẾP',
  BARTENDER = 'PHA CHẾ',
  DELIVERY = 'GIAO HÀNG',
}

export interface EditEmployeeForm {
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  dateHired?: string;
  phone?: string;
  position?: string;
  address?: string;
  nationalID?: string;
}

export const APPLICATION_IMAGES = 'image/png,image/jpeg';

export const EditEmployeeComponent: React.FC = () => {
  const categories = useAppSelector((state) => state?.category?.categories);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [fileValue, setFile] = useState<File>();
  const [categoriesData, setCategoryData] = useState<TableData<ICategoryModel>>({
    data: categories,
    loading: true,
  });
  const { Option } = Select;

  const [isLoading, setLoading] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [dateOfBirthMoment, setDateOfBirthMoment] = useState<moment.Moment>();
  const [dateHired, setDateHired] = useState<string>('');
  const [dateHiredMoment, setDateHiredMoment] = useState<moment.Moment>();
  const [employeePassword, setEmployeePassword] = useState<string>('');

  const { id } = useParams();
  const [form] = BaseForm.useForm();
  const [formValue, setFormValue] = useState<EditEmployeeForm>({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    dateHired: '',
    phone: '',
    position: '',
    address: '',
    nationalID: '',
  });

  const handleSubmit = (values: EditEmployeeForm) => {
    setLoading(true);
    const requestParam: UpdateEmployeeRequest = {
      id: id as string,
      email: values.email,
      firstName: values.firstName as string,
      lastName: values.lastName as string,
      dateOfBirth: dateOfBirth,
      dateHired: dateHired,
      phone: values.phone as string,
      position: values.position as string,
      address: values.address as string,
      nationalID: values.nationalID as string,
    };

    dispatch(doUpdateEmployee(requestParam))
      .unwrap()
      .then((res) => {
        notificationController.success({ message: 'Cập nhật thông tin nhân viên thành công !' });
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
    if (date) {
      // Calculate the minimum allowed birth date (18 years ago from today)
      const minBirthDate = moment().subtract(18, 'years');

      if (date.isBefore(minBirthDate)) {
        // Date is valid
        const formattedDate = date.format('DD/MM/YYYY');
        setDateOfBirth(formattedDate);
      } else {
        // Date is not valid, show an error message or take appropriate action
        // You can display a message or prevent the selection
        // For example, you can show an error message:
        notificationController.error({ message: 'Nhân viên phải từ 18 tuổi trở lên.' });
      }
    } else {
      setDateOfBirth('');
    }
  };

  const handleDateHiredChange = (date: moment.Moment | null) => {
    if (date) {
      // Check if dateHired is not sooner than dateOfBirth
      if (date.isSameOrAfter(dateOfBirthMoment)) {
        const formattedDate = date.format('DD/MM/YYYY');
        setDateHired(formattedDate);
      } else {
        // Date is not valid, show an error message or take appropriate action
        notificationController.error({ message: 'Ngày vào làm không được sớm hơn ngày sinh.' });
      }
    } else {
      setDateHired('');
    }
  };

  const fetchEmployee = useCallback(() => {
    if (id) {
      dispatch(doGetUserById(id))
        .unwrap()
        .then((res) => {
          setDateOfBirthMoment(moment(res.dateOfBirth, 'DD/MM/YYYY'));
          setDateHiredMoment(moment(res.dateHired, 'DD/MM/YYYY'));
          setEmployeePassword(res.employeePassword as string);
          setDateOfBirth(res.dateOfBirth as string);
          setDateHired(res.dateHired as string);
          setFormValue({
            email: res.email,
            firstName: res.firstName,
            lastName: res.lastName,
            dateOfBirth: res.dateOfBirth,
            dateHired: res.dateHired,
            position: res.position,
            phone: res.phone,
            address: res.address,
            nationalID: res.nationalID,
          });
          form.resetFields();
        });
    }
  }, [dispatch, id, form]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  const handleCopy = (text: string) => {
    copyToClipBoard(text).then((success) => {
      if (success) {
        notificationController.success({ message: 'Đã copy vào clipboard' });
      }
    });
  };

  return (
    <S.Container>
      <S.FormDiv>
        <BaseForm layout="vertical" onFinish={handleSubmit} form={form} initialValues={formValue}>
          <BaseForm.Item>
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
              disabled={true}
            ></InputTextField>
          </BaseForm.Item>
          <BaseForm.Item>
            <InputTextField
              name="firstName"
              label={'Tên nhân viên'}
              rules={[{ required: true, message: t('common.requiredField') }]}
              placeholder={'Nhập tên nhân viên'}
            ></InputTextField>
          </BaseForm.Item>
          <BaseForm.Item>
            <InputTextField
              name="lastName"
              label={'Họ nhân viên'}
              rules={[{ required: true, message: t('common.requiredField') }]}
              placeholder={'Nhập họ nhân viên'}
            ></InputTextField>
          </BaseForm.Item>
          <BaseForm.Item>
            <S.Title>{'Ngày sinh nhân viên'}</S.Title>
            <DatePicker
              name="dateOfBirth"
              placeholder={'Chọn ngày sinh'}
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              onChange={(e) => handleDateOfBirthChange(e)}
              value={dateOfBirthMoment ? moment(dateOfBirthMoment, 'DD/MM/YYYY') : null}
            ></DatePicker>
          </BaseForm.Item>
          <BaseForm.Item>
            <InputTextField
              name="nationalID"
              label={'Số CMND/CCCD'}
              rules={[{ required: true, message: t('common.requiredField') }]}
              placeholder={'Nhập số CMND/CCCD'}
            ></InputTextField>
          </BaseForm.Item>
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
          <BaseForm.Item>
            <S.Title>{'Ngày vào làm'}</S.Title>
            <DatePicker
              name="dateHired"
              placeholder={'Chọn ngày vào làm'}
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              onChange={(e) => handleDateHiredChange(e)}
              value={dateHiredMoment ? moment(dateHiredMoment, 'DD/MM/YYYY') : null}
            ></DatePicker>
          </BaseForm.Item>
          <BaseForm.Item>
            <InputTextField
              name="phone"
              label={'Số điện thoại'}
              rules={[{ required: true, message: t('common.requiredField') }]}
              placeholder={'Nhập số điện thoại nhân viên'}
            ></InputTextField>
          </BaseForm.Item>
          <BaseForm.Item>
            <InputTextAreaField
              name="address"
              label={'Địa chỉ nhà'}
              row={5}
              placeholder={'Nhập địa chỉ nhà'}
              defaultValue={formValue.address}
            ></InputTextAreaField>
          </BaseForm.Item>
          <Row>
            <Col span={22}>
              <InputTextField
                label={'Mật khẩu của nhân viên'}
                rules={[{ required: false, message: t('common.requiredField') }]}
                disabled={true}
                value={employeePassword}
              ></InputTextField>
            </Col>
            <Col span={2}>
              <S.ButtonInput>
                <CommonButton type="default" title={<CopyFilled />} onClick={() => handleCopy(employeePassword)} />
              </S.ButtonInput>
            </Col>
          </Row>
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <S.WrapperButton>
                <CommonButton type="default" title={'Hủy'} onClick={handleCancel}></CommonButton>
                <BaseForm.Item noStyle>
                  <CommonButton type="primary" htmlType="submit" loading={isLoading} title={'Lưu'}></CommonButton>
                </BaseForm.Item>
              </S.WrapperButton>
            </Col>
          </Row>
        </BaseForm>
      </S.FormDiv>
    </S.Container>
  );
};
