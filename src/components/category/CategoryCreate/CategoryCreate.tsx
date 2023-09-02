import { LanguageCode } from '@app/constants/enums/common';
import { RouterPaths } from '@app/constants/enums/routerPaths';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as S from './CategoryCreate.styles';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { InputTextField } from '@app/components/input/InputTextField/InputTextField';
import { Col, Row, Select } from 'antd';
import { InputTextAreaField } from '@app/components/input/InputTextAreaField/InputTextAreaField';
import { SwitchButtonCommon } from '@app/components/switch/ToggleButton/SwitchButtonCommon';
import { CommonButton } from '@app/components/button/CommonButton/CommonButton';
import { DragAndDropFile } from '@app/components/common/Upload/Upload';
import { InputTypeEnum } from '@app/constants/enums/inputType';
import { CreateProductRequest } from '@app/domain/ProductModel';
import { doCreateProduct } from '@app/store/slices/productSlice';
import { uploadProductImage } from '@app/api/product.api';
import { doCreateCategory, doGetAllCategories } from '@app/store/slices/categorySlice';
import { TableData } from '@app/components/tables/BasicTable/BasicTable';
import { CreateCategoryRequest, ICategoryModel } from '@app/domain/CategoryModel';
import { uploadCategoryImage } from '@app/api/category.api';

interface IFileCustoms extends FileList {
  originFileObj: File;
}

export const APPLICATION_IMAGES = 'image/png,image/jpeg';

export const CreateCategoryComponent: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [fileValue, setFile] = useState<File>();

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit = (values: CreateCategoryRequest) => {
    setLoading(true);
    const requestParam: CreateCategoryRequest = {
      name: values.name,
      slug: values.slug,
    };

    dispatch(doCreateCategory(requestParam))
      .unwrap()
      .then((res) => {
        if (fileValue) {
          uploadCategoryImage(res.id, fileValue)
            .then(() => {
              notificationController.success({ message: 'Tạo danh mục thành công !' });
              navigate(`${RouterPaths.PATH}${RouterPaths.CATEGORY_MANAGEMENT}${RouterPaths.PATH}${RouterPaths.LIST}`);
            })
            .catch((err) => {
              setLoading(false);
              notificationController.error({ message: 'Có lỗi xảy ra upload ảnh của danh mục thất bại' });
            });
        }
      })
      .catch((err) => {
        notificationController.error({ message: 'Có lỗi xảy ra tạo danh mục thất bại !' });
        setLoading(false);
      });
  };

  const handleCancel = () => {
    navigate(`${RouterPaths.PATH}${RouterPaths.CATEGORY_MANAGEMENT}${RouterPaths.PATH}${RouterPaths.LIST}`);
  };

  return (
    <S.Container>
      <S.FormDiv>
        <BaseForm layout="vertical" onFinish={handleSubmit}>
          <InputTextField
            name="name"
            label={'Tên danh mục'}
            rules={[{ required: true, message: t('common.requiredField') }]}
            placeholder={'Nhập tên danh mục'}
          ></InputTextField>
          <InputTextField
            name="slug"
            label={'Slug'}
            rules={[{ required: true, message: t('common.requiredField') }]}
            placeholder={'Nhập tên slug'}
          ></InputTextField>
          <S.Title>{'Ảnh danh mục'}</S.Title>
          <DragAndDropFile
            maxCount={1}
            title={'Kéo thả file ảnh của danh mục vào đây'}
            accept={APPLICATION_IMAGES}
            onFileDropped={function (files: FileList): void {
              if (files[0]) {
                const { originFileObj } = files[0] as unknown as IFileCustoms;
                setFile(originFileObj);
              }
            }}
          />
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
