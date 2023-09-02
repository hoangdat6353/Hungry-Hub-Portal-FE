import { RouterPaths } from '@app/constants/enums/routerPaths';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './CategoryEdit.styles';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { InputTextField } from '@app/components/input/InputTextField/InputTextField';
import { Col, Row, Select } from 'antd';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { DragAndDropFile } from '@app/components/common/Upload/Upload';

import {
  doCreateCategory,
  doGetAllCategories,
  doGetCategoryById,
  doUpdateCategory,
} from '@app/store/slices/categorySlice';
import { CreateCategoryRequest, ICategoryModel, UpdateCategoryRequest } from '@app/domain/CategoryModel';
import { uploadCategoryImage } from '@app/api/category.api';

interface IFileCustoms extends FileList {
  originFileObj: File;
}

export interface EditCategoryForm {
  name: string;
  slug: string;
}

export const APPLICATION_IMAGES = 'image/png,image/jpeg';

export const EditCategoryComponent: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [form] = BaseForm.useForm();
  const [formValue, setFormValue] = useState<EditCategoryForm>({
    name: '',
    slug: '',
  });

  const handleSubmit = (values: EditCategoryForm) => {
    setLoading(true);
    const requestParam: UpdateCategoryRequest = {
      id: id as string,
      name: values.name,
      slug: values.slug,
    };

    dispatch(doUpdateCategory(requestParam))
      .unwrap()
      .then((res) => {
        if (res.isSuccess) {
          notificationController.success({ message: 'Cập nhật thông tin danh mục thành công !' });
        }
        navigate(`${RouterPaths.PATH}${RouterPaths.CATEGORY_MANAGEMENT}${RouterPaths.PATH}${RouterPaths.LIST}`);
      })
      .catch((err) => {
        notificationController.error({ message: 'Có lỗi xảy ra cập nhật sản phẩm thất bại !' });
        setLoading(false);
      });
  };

  const handleCancel = () => {
    navigate(`${RouterPaths.PATH}${RouterPaths.CATEGORY_MANAGEMENT}${RouterPaths.PATH}${RouterPaths.LIST}`);
  };

  const fetchCategory = useCallback(() => {
    if (id) {
      dispatch(doGetCategoryById(id))
        .unwrap()
        .then((res) => {
          setFormValue({
            name: res.name,
            slug: res.slug,
          });
          form.resetFields();
        });
    }
  }, [dispatch, id, form]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return (
    <S.Container>
      <S.FormDiv>
        <BaseForm layout="vertical" onFinish={handleSubmit} form={form} initialValues={formValue}>
          <BaseForm.Item>
            <InputTextField
              name="name"
              label={'Tên danh mục'}
              rules={[{ required: true, message: t('common.requiredField') }]}
              placeholder={'Nhập tên danh mục'}
            ></InputTextField>
          </BaseForm.Item>
          <BaseForm.Item>
            <InputTextField
              name="slug"
              label={'Slug'}
              rules={[{ required: true, message: t('common.requiredField') }]}
              placeholder={'Nhập tên slug'}
            ></InputTextField>
          </BaseForm.Item>
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
